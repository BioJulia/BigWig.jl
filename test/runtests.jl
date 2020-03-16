using Test
using BigWig
import GenomicFeatures
using BioCore

using FormatSpecimens

@testset "BigWig" begin
    @testset "empty" begin
        buffer = IOBuffer()
        data = buffer.data
        writer = BigWig.Writer(buffer, [("chr1", 1000)])
        close(writer)
        reader = BigWig.Reader(IOBuffer(data))
        @test length(collect(reader)) == 0
    end

    @testset "small" begin
        buffer = IOBuffer()
        data = buffer.data
        writer = BigWig.Writer(buffer, [("chr1", 1000)])
        write(writer, ("chr1", 50, 100, 3.14))
        close(writer)
        reader = BigWig.Reader(IOBuffer(data))
        records = collect(reader)
        @test length(records) == 1
        @test BigWig.haschrom(records[1]) === BioCore.hasseqname(records[1]) === true
        @test BigWig.chrom(records[1]) == seqname(records[1]) == "chr1"
        @test BigWig.haschromstart(records[1]) === hasleftposition(records[1]) === true
        @test BigWig.chromstart(records[1]) === leftposition(records[1]) === 50
        @test BigWig.haschromend(records[1]) === hasrightposition(records[1]) === true
        @test BigWig.chromend(records[1]) === rightposition(records[1]) === 100
        @test BigWig.hasvalue(records[1])
        @test BigWig.value(records[1]) === 3.14f0
        @test startswith(repr(records[1]), "BigWig.Record:\n")
        interval = convert(GenomicFeatures.Interval, records[1])
        @test GenomicFeatures.seqname(interval) == "chr1"
        @test GenomicFeatures.leftposition(interval) === 50
        @test GenomicFeatures.rightposition(interval) === 100
        @test GenomicFeatures.metadata(interval) === 3.14f0
        @test all(isnan.(BigWig.values(reader, "chr1", 1:49)))
        @test BigWig.values(reader, "chr1", 50:51) == [3.14f0, 3.14f0]
        @test BigWig.values(reader, "chr1", 99:100) == [3.14f0, 3.14f0]
        @test all(isnan.(BigWig.values(reader, "chr1", 101:200)))
        @test BigWig.values(reader, GenomicFeatures.Interval("chr1", 55, 56)) == [3.14f0, 3.14f0]

        # bedgraph (default)
        buffer = IOBuffer()
        data = buffer.data
        writer = BigWig.Writer(buffer, [("chr1", 1000)]; datatype=:bedgraph)
        write(writer, ("chr1",  1, 10, 0.0))
        write(writer, ("chr1", 15, 15, 1.0))
        write(writer, ("chr1", 90, 99, 2.0))
        close(writer)
        reader = BigWig.Reader(IOBuffer(data))
        records = collect(reader)
        @test length(records) == 3
        @test BigWig.chrom.(records) == ["chr1", "chr1", "chr1"]
        @test BigWig.chromstart.(records) == [1, 15, 90]
        @test BigWig.chromend.(records) == [10, 15, 99]
        @test BigWig.value.(records) == [0.0, 1.0, 2.0]

        # varstep
        buffer = IOBuffer()
        data = buffer.data
        writer = BigWig.Writer(buffer, [("chr1", 1000)]; datatype=:varstep)
        write(writer, ("chr1",  1, 10, 0.0))
        write(writer, ("chr1", 15, 24, 1.0))
        write(writer, ("chr1", 90, 99, 2.0))
        close(writer)
        reader = BigWig.Reader(IOBuffer(data))
        records = collect(reader)
        @test length(records) == 3
        @test BigWig.chrom.(records) == ["chr1", "chr1", "chr1"]
        @test BigWig.chromstart.(records) == [1, 15, 90]
        @test BigWig.chromend.(records) == [10, 24, 99]
        @test BigWig.value.(records) == [0.0, 1.0, 2.0]

        # fixedstep
        buffer = IOBuffer()
        data = buffer.data
        writer = BigWig.Writer(buffer, [("chr1", 1000)]; datatype=:fixedstep)
        write(writer, ("chr1",  1,  5, 0.0))
        write(writer, ("chr1", 11, 15, 1.0))
        write(writer, ("chr1", 21, 25, 2.0))
        close(writer)
        reader = BigWig.Reader(IOBuffer(data))
        records = collect(reader)
        @test length(records) == 3
        @test BigWig.chrom.(records) == ["chr1", "chr1", "chr1"]
        @test BigWig.chromstart.(records) == [1, 11, 21]
        @test BigWig.chromend.(records) == [5, 15, 25]
        @test BigWig.value.(records) == [0.0, 1.0, 2.0]
    end

    @testset "large" begin
        buffer = IOBuffer()
        data = buffer.data
        binsize = 32
        writer = BigWig.Writer(buffer, [("chr1", 100_000), ("chr2", 90_000)], binsize=binsize)
        for i in 1:10_000
            write(writer, ("chr1", (i-1)*10+1, i*10, log(i)))
        end
        n = 0
        p = 1
        while p ≤ 90_000
            sz = min(rand(1:100), 90_000 - p)
            write(writer, ("chr2", p, p+sz, log(p)))
            n += 1
            p += sz + 1
        end
        close(writer)
        reader = BigWig.Reader(IOBuffer(data))
        records = collect(reader)
        @test length(records) == 10_000 + n
        records = collect(GenomicFeatures.eachoverlap(reader, GenomicFeatures.Interval("chr1", 50_001, 50_165)))
        @test length(records) == 17
        @testset for bin in [1, 5, 10, 51, 300]
            for scale in 1:2
                binsize_scaled = binsize * BigWig.ZOOM_SCALE_FACTOR^(scale-1)
                chromstart = (bin - 1) * binsize_scaled + 1
                chromend = bin * binsize_scaled
                @test BigWig.coverage(reader, "chr1", chromstart, chromend; usezoom=false) == BigWig.coverage(reader, "chr1", chromstart, chromend; usezoom=true)
                @test BigWig.mean(reader, "chr1", chromstart, chromend; usezoom=false)     ≈  BigWig.mean(reader, "chr1", chromstart, chromend; usezoom=true)
                @test BigWig.minimum(reader, "chr1", chromstart, chromend; usezoom=false)  ≈  BigWig.minimum(reader, "chr1", chromstart, chromend; usezoom=true)
                @test BigWig.maximum(reader, "chr1", chromstart, chromend; usezoom=false)  ≈  BigWig.maximum(reader, "chr1", chromstart, chromend; usezoom=true)
                # TODO: use more stable algorithm?
                #@test_approx_eq BigWig.std(reader, "chr1", chromstart, chromend; usezoom=false)     BigWig.std(reader, "chr1", chromstart, chromend; usezoom=true)
            end
        end
    end

    @testset "round trip" begin
        function test_round_trip(filepath)
            reader = open(BigWig.Reader, filepath)
            buffer = IOBuffer()
            data = buffer.data
            writer = BigWig.Writer(buffer, BigWig.chromlist(reader))
            original = []
            for record in reader
                t = (BigWig.chrom(record), BigWig.chromstart(record), BigWig.chromend(record), BigWig.value(record))
                write(writer, t)
                push!(original, t)
            end
            close(writer)
            close(reader)

            reader = BigWig.Reader(IOBuffer(data))
            copy = []
            for record in reader
                t = (BigWig.chrom(record), BigWig.chromstart(record), BigWig.chromend(record), BigWig.value(record))
                push!(copy, t)
            end
            close(reader)

            @test original == copy
        end

        dir = path_of_format("BBI")
        for specimen in list_valid_specimens("BBI")
            if hastag(specimen, "bigwig")
                test_round_trip(joinpath(dir, specimen["filename"]))
            end
        end

    end
end

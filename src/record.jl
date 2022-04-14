# BigBed Record
# =============

# type Record is defined in reader.jl.

"""
    BigWig.Record()

Create an unfilled bigWig record.
"""
function Record()
    return Record(0, 0, NaN32)
end

function Base.convert(::Type{GenomicInterval}, record::Record)
    return GenomicInterval(
        chrom(record), chromstart(record), chromend(record),
        GenomicFeatures.STRAND_BOTH, value(record))
end

function Base.convert(::Type{GenomicInterval{Record}}, record::Record)
    return convert(GenomicInterval, record)
end

function BioCore.isfilled(record::Record)
    return isdefined(record, :reader)
end

function Base.copy(record::Record)
    copy = Record(record.chromstart, record.chromend, record.value)
    copy.header = record.header
    if isdefined(record, :reader)
        copy.reader = record.reader
    end
    return copy
end

function Base.show(io::IO, record::Record)
    if get(io, :compact, false)
        print(io, chrom(record), ':', chromstart(record), '-', chromend(record), "  ", value(record))
    else
        print(io, summary(record), ':')
        if isfilled(record)
            println(io)
            println(io, "  chromosome: ", chrom(record))
            println(io, "       start: ", chromstart(record))
            println(io, "         end: ", chromend(record))
              print(io, "       value: ", value(record))
        else
            print(io, " <not filled>")
        end
    end
end


# Accessor functions
# ------------------

"""
    chromid(record::Record)::UInt32

Get the chromosome ID of `record`.
"""
function chromid(record::Record)::UInt32
    checkfilled(record)
    return record.header.chromid
end

"""
    chrom(record::Record)::String

Get the chromosome name of `record`.
"""
function chrom(record::Record)::String
    checkfilled(record)
    return record.reader.chrom_names[chromid(record)]
end

function haschrom(record::Record)
    return isfilled(record)
end

function BioCore.seqname(record::Record)
    return chrom(record)
end

function BioCore.hasseqname(record::Record)
    return haschrom(record)
end

"""
    chromstart(record::Record)::Int

Get the start position of `record`.
"""
function chromstart(record::Record)::Int
    checkfilled(record)
    return record.chromstart + 1
end

function haschromstart(record::Record)
    return isfilled(record)
end

function BioCore.leftposition(record::Record)
    return chromstart(record)
end

function BioCore.hasleftposition(record::Record)
    return haschromstart(record)
end

"""
    chromend(record::Record)::Int

Get the end position of `record`.
"""
function chromend(record::Record)::Int
    checkfilled(record)
    return record.chromend % Int
end

function haschromend(record::Record)
    return isfilled(record)
end

function BioCore.rightposition(record::Record)
    return chromend(record)
end

function BioCore.hasrightposition(record::Record)
    return haschromend(record)
end

"""
    value(record::Record)::Float32

Get the value of `record`.
"""
function value(record::Record)::Float32
    checkfilled(record)
    return record.value
end

function hasvalue(record::Record)
    return isfilled(record)
end

function checkfilled(record::Record)
    if !isfilled(record)
        throw(ArgumentError("bigWig record is not filled"))
    end
end

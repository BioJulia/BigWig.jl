var documenterSearchIndex = {"docs":
[{"location":"man/BigWig/#BigWig.jl-1","page":"BigWig","title":"BigWig.jl","text":"","category":"section"},{"location":"man/BigWig/#","page":"BigWig","title":"BigWig","text":"The bigWig format is a binary format for associating a floating point number with each base of the genome. The bigWig files are indexed to quickly fetch specific regions.","category":"page"},{"location":"man/BigWig/#","page":"BigWig","title":"BigWig","text":"I/O tools for bigWig are provided by the BigWig module, which exports following three types:","category":"page"},{"location":"man/BigWig/#","page":"BigWig","title":"BigWig","text":"Reader type: BigWig.Reader\nWriter type: BigWig.Writer\nElement type: BigWig.Record","category":"page"},{"location":"man/BigWig/#Examples-1","page":"BigWig","title":"Examples","text":"","category":"section"},{"location":"man/BigWig/#","page":"BigWig","title":"BigWig","text":"A common workflow is to open a file, iterate over records, and close the file:","category":"page"},{"location":"man/BigWig/#","page":"BigWig","title":"BigWig","text":"# Import the BigWig module.\nusing BigWig\n\n# Open a bigWig file (e.g. mapping depth or coverage).\nreader = open(BigWig.Reader, \"data.cov.bw\")\n\n# Iterate over records overlapping with a query interval.\nfor record in eachoverlap(reader, Interval(\"Chr2\", 5001, 6000))\n    # Extract the start position, end position and value of the record.\n    startpos = BigWig.chromstart(record)\n    endpos = BigWig.chromend(record)\n    value = BigWig.value(record)\n    # and do something...\nend\n\n# Finally, close the reader.\nclose(reader)","category":"page"},{"location":"man/BigWig/#","page":"BigWig","title":"BigWig","text":"BigWig.values is a handy function that returns a vector of values. This returns a value per position within the query region:","category":"page"},{"location":"man/BigWig/#","page":"BigWig","title":"BigWig","text":"# Get values in Chr2:5001-6000 as a vector of 1000 elements.\nBigWig.values(reader, Interval(\"Chr2\", 5001, 6000))","category":"page"},{"location":"man/BigWig/#","page":"BigWig","title":"BigWig","text":"Iterating over all records is also supported:","category":"page"},{"location":"man/BigWig/#","page":"BigWig","title":"BigWig","text":"reader = open(BigWig.Reader, \"data.cov.bw\")\nfor record in reader\n    # ...\nend\nclose(reader)","category":"page"},{"location":"man/BigWig/#","page":"BigWig","title":"BigWig","text":"Creating a bigWig can be written as follows:","category":"page"},{"location":"man/BigWig/#","page":"BigWig","title":"BigWig","text":"# Open an output file.\nfile = open(\"data.cov.bw\", \"w\")\n\n# Initialize a bigWig writer.\nwriter = BigWig.Writer(file, [(\"chr1\", 2000), (\"chr2\", 1000)])\n\n# Write records.\nwrite(writer, (\"chr1\",   1, 100, 1.0))\nwrite(writer, (\"chr1\", 101, 200, 2.1))\n# ...\nwrite(writer, (\"chr2\",  51, 150, 3.2))\n\n# Close the writer (this closes the file, too).\nclose(writer)","category":"page"},{"location":"#BigWig.jl-1","page":"Home","title":"BigWig.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"(Image: Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.) (Image: Latest Release) (Image: MIT license) (Image: Stable documentation) (Image: Latest documentation) (Image: Join the chat at https://gitter.im/BioJulia/BigWig.jl)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"This project follows the semver pro forma and uses the git-flow branching model.","category":"page"},{"location":"#Description-1","page":"Home","title":"Description","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Data representation and IO tools for the bigWig file format.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The bigWig format is a binary format for associating a floating point number with each base of the genome. The bigWig files are indexed to quickly fetch specific regions.","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"BigWig is made available to install through BioJulia's package registry. By default, Julia's package manager only uses the \"General\" package registry. Your Julia configuration needs to include the BioJulia registry to be able to install the latest version of BigWig.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"To add the BioJulia registry from the Julia REPL, press ] to enter pkg mode, then enter the following command:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"registry add https://github.com/BioJulia/BioJuliaRegistry.git","category":"page"},{"location":"#","page":"Home","title":"Home","text":"After adding the registry to your configuration, you can install BigWig while in pkg mode with the following:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"add BigWig","category":"page"},{"location":"#","page":"Home","title":"Home","text":"If you are interested in the cutting edge of the development, please check out the develop branch to try new features before release.","category":"page"},{"location":"#Testing-1","page":"Home","title":"Testing","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"BigWig is tested against Julia 1.X on Linux, OS X, and Windows.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Latest build status:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: Unit tests) (Image: Documentation) (Image: codecov)","category":"page"},{"location":"#Contributing-1","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"We appreciate contributions from users including reporting bugs, fixing issues, improving performance and adding new features.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Take a look at the contributing files detailed contributor and maintainer guidelines, and code of conduct.","category":"page"},{"location":"#Financial-contributions-1","page":"Home","title":"Financial contributions","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"We also welcome financial contributions in full transparency on our open collective. Anyone can file an expense. If the expense makes sense for the development the core contributors and the person who filed the expense will be reimbursed.","category":"page"},{"location":"#Backers-and-Sponsors-1","page":"Home","title":"Backers & Sponsors","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Thank you to all our backers and sponsors!","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Love our work and community? Become a backer.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: backers)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Does your company use BioJulia? Help keep BioJulia feature rich and healthy by sponsoring the project. Your logo will show up here with a link to your website.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: ) (Image: ) (Image: ) (Image: ) (Image: ) (Image: ) (Image: ) (Image: ) (Image: ) (Image: )","category":"page"},{"location":"#Questions?-1","page":"Home","title":"Questions?","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"If you have a question about contributing or using BioJulia software, come on over and chat to us on Gitter, or you can try the Bio category of the Julia discourse site.","category":"page"},{"location":"man/api/#API-Reference-1","page":"API Reference","title":"API Reference","text":"","category":"section"},{"location":"man/api/#Public-1","page":"API Reference","title":"Public","text":"","category":"section"},{"location":"man/api/#","page":"API Reference","title":"API Reference","text":"Modules = [BigWig]\nPrivate = false","category":"page"},{"location":"man/api/#Internal-1","page":"API Reference","title":"Internal","text":"","category":"section"},{"location":"man/api/#","page":"API Reference","title":"API Reference","text":"Modules = [BigWig]\nPublic = false","category":"page"},{"location":"man/api/#BigWig.Reader-Tuple{IO}","page":"API Reference","title":"BigWig.Reader","text":"BigWig.Reader(input::IO)\n\nCreate a reader for bigWig file format.\n\nNote that input must be seekable.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.Record-Tuple{}","page":"API Reference","title":"BigWig.Record","text":"BigWig.Record()\n\nCreate an unfilled bigWig record.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.Writer-Tuple{IO,Union{AbstractDict, AbstractArray{T,1} where T}}","page":"API Reference","title":"BigWig.Writer","text":"BigWig.Writer(output::IO, chromlist; binsize=64, datatype=:bedgraph)\n\nCreate a data writer of the bigWig file format.\n\nArguments\n\noutput: data sink\nchromlist: chromosome list with length\nbinsize=64: size of a zoom with the highest resolution\ndatatype=:bedgraph: encoding of values (:bedgraph, :varstep or :fixedstep)\n\nExamples\n\noutput = open(\"data.bw\", \"w\")\nwriter = BigWig.Writer(output, [(\"chr1\", 12345), (\"chr2\", 9100)])\nwrite(writer, (\"chr1\", 501, 600, 1.0))\nwrite(writer, (\"chr2\", 301, 450, 3.0))\nclose(writer)\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.chrom-Tuple{BigWig.Record}","page":"API Reference","title":"BigWig.chrom","text":"chrom(record::Record)::String\n\nGet the chromosome name of record.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.chromend-Tuple{BigWig.Record}","page":"API Reference","title":"BigWig.chromend","text":"chromend(record::Record)::Int\n\nGet the end position of record.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.chromid-Tuple{BigWig.Record}","page":"API Reference","title":"BigWig.chromid","text":"chromid(record::Record)::UInt32\n\nGet the chromosome ID of record.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.chromlist-Tuple{BigWig.Reader}","page":"API Reference","title":"BigWig.chromlist","text":"chromlist(reader::BigWig.Reader)::Vector{Tuple{String,Int}}\n\nGet the (name, length) pairs of chromosomes/contigs.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.chromstart-Tuple{BigWig.Record}","page":"API Reference","title":"BigWig.chromstart","text":"chromstart(record::Record)::Int\n\nGet the start position of record.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.coverage-Tuple{BigWig.Reader,AbstractString,Integer,Integer}","page":"API Reference","title":"BigWig.coverage","text":"coverage(reader, chrom, chromstart, chromend; usezoom=false)::Int\n\nCompute the coverage of values in [chromstart, chromend] of chrom.\n\nIf usezoom is true, this function tries to use precomputed statistics (zoom) in the file. This is often faster but not exact in most cases.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.maximum-Tuple{BigWig.Reader,AbstractString,Integer,Integer}","page":"API Reference","title":"BigWig.maximum","text":"maximum(reader, chrom, chromstart, chromend; usezoom=false)::Float32\n\nCompute the maximum of values in [chromstart, chromend] of chrom.\n\nThis function returns NaN32 if there are no data in that range.\n\nSee coverage for the usezoom keyword argument.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.mean-Tuple{BigWig.Reader,AbstractString,Integer,Integer}","page":"API Reference","title":"BigWig.mean","text":"mean(reader, chrom, chromstart, chromend; usezoom=false)::Float32\n\nCompute the mean of values in [chromstart, chromend] of chrom.\n\nThis function returns NaN32 if there are no data in that range.\n\nSee coverage for the usezoom keyword argument.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.minimum-Tuple{BigWig.Reader,AbstractString,Integer,Integer}","page":"API Reference","title":"BigWig.minimum","text":"minimum(reader, chrom, chromstart, chromend; usezoom=false)::Float32\n\nCompute the minimum of values in [chromstart, chromend] of chrom.\n\nThis function returns NaN32 if there are no data in that range.\n\nSee coverage for the usezoom keyword argument.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.std-Tuple{BigWig.Reader,AbstractString,Integer,Integer}","page":"API Reference","title":"BigWig.std","text":"std(reader, chrom, chromstart, chromend; usezoom=false)::Float32\n\nCompute the standard deviation of values in [chromstart, chromend] of chrom.\n\nSee coverage for the usezoom keyword argument.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.value-Tuple{BigWig.Record}","page":"API Reference","title":"BigWig.value","text":"value(record::Record)::Float32\n\nGet the value of record.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.values-Tuple{BigWig.Reader,AbstractString,UnitRange}","page":"API Reference","title":"BigWig.values","text":"values(reader::BigWig.Reader, chrom::AbstractString, range::UnitRange)::Vector{Float32}\n\nGet a vector of values within range of chrom from reader.\n\nThis function fills missing values with NaN32.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#BigWig.values-Tuple{BigWig.Reader,GenomicFeatures.Interval}","page":"API Reference","title":"BigWig.values","text":"values(reader::BigWig.Reader, interval::Interval)::Vector{Float32}\n\nGet a vector of values within interval from reader.\n\nThis function fills missing values with NaN32.\n\n\n\n\n\n","category":"method"}]
}

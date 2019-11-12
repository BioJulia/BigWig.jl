var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "#BigWig.jl-1",
    "page": "Home",
    "title": "BigWig.jl",
    "category": "section",
    "text": ""
},

{
    "location": "#Description-1",
    "page": "Home",
    "title": "Description",
    "category": "section",
    "text": "bigWig is a binary file format for associating a floating point number with each base in the genome. bigWig files are indexed to quickly fetch specific regions.I/O tools for bigWig are provided by the BigWig module, which exports following three types:Reader type: BigWig.Reader\nWriter type: BigWig.Writer\nElement type: BigWig.Record"
},

{
    "location": "#Installation-1",
    "page": "Home",
    "title": "Installation",
    "category": "section",
    "text": "You can install BigWig from the Julia REPL:julia> Pkg.add(\"BigWig\")If you are interested in the cutting edge of the development, please check out the master branch to try new features before release."
},

{
    "location": "#Examples-1",
    "page": "Home",
    "title": "Examples",
    "category": "section",
    "text": "A common workflow is to open a file, iterate over records, and close the file:# Import the BigWig module.\nusing BigWig\n\n# Open a bigWig file (e.g. mapping depth or coverage).\nreader = open(BigWig.Reader, \"data.cov.bw\")\n\n# Iterate over records overlapping with a query interval.\nfor record in eachoverlap(reader, Interval(\"Chr2\", 5001, 6000))\n    # Extract the start position, end position and value of the record,\n    startpos = BigWig.chromstart(record)\n    endpos = BigWig.chromend(record)\n    value = BigWig.value(record)\n    # and do something...\nend\n\n# Finally, close the reader.\nclose(reader)BigWig.values is a handy function that returns a vector of values. This returns a value per position within the query region:# Get values in Chr2:5001-6000 as a vector of 1000 elements.\nBigWig.values(reader, Interval(\"Chr2\", 5001, 6000))Iterating over all records is also supported:reader = open(BigWig.Reader, \"data.cov.bw\")\nfor record in reader\n    # ...\nend\nclose(reader)Creating a bigWig can be written as follows:# Open an output file.\nfile = open(\"data.cov.bw\", \"w\")\n\n# Initialize a bigWig writer.\nwriter = BigWig.Writer(file, [(\"chr1\", 2000), (\"chr2\", 1000)])\n\n# Write records.\nwrite(writer, (\"chr1\",   1, 100, 1.0))\nwrite(writer, (\"chr1\", 101, 200, 2.1))\n# ...\nwrite(writer, (\"chr2\",  51, 150, 3.2))\n\n# Close the writer (this closes the file, too).\nclose(writer)"
},

{
    "location": "#BigWig.Reader",
    "page": "Home",
    "title": "BigWig.Reader",
    "category": "type",
    "text": "BigWig.Reader(input::IO)\n\nCreate a reader for bigWig file format.\n\nNote that input must be seekable.\n\n\n\n\n\n"
},

{
    "location": "#BigWig.chromlist",
    "page": "Home",
    "title": "BigWig.chromlist",
    "category": "function",
    "text": "chromlist(reader::BigWig.Reader)::Vector{Tuple{String,Int}}\n\nGet the (name, length) pairs of chromosomes/contigs.\n\n\n\n\n\n"
},

{
    "location": "#BigWig.values",
    "page": "Home",
    "title": "BigWig.values",
    "category": "function",
    "text": "values(reader::BigWig.Reader, interval::Interval)::Vector{Float32}\n\nGet a vector of values within interval from reader.\n\nThis function fills missing values with NaN32.\n\n\n\n\n\nvalues(reader::BigWig.Reader, chrom::AbstractString, range::UnitRange)::Vector{Float32}\n\nGet a vector of values within range of chrom from reader.\n\nThis function fills missing values with NaN32.\n\n\n\n\n\n"
},

{
    "location": "#BigWig.Writer",
    "page": "Home",
    "title": "BigWig.Writer",
    "category": "type",
    "text": "BigWig.Writer(output::IO, chromlist; binsize=64, datatype=:bedgraph)\n\nCreate a data writer of the bigWig file format.\n\nArguments\n\noutput: data sink\nchromlist: chromosome list with length\nbinsize=64: size of a zoom with the highest resolution\ndatatype=:bedgraph: encoding of values (:bedgraph, :varstep or :fixedstep)\n\nExamples\n\noutput = open(\"data.bw\", \"w\")\nwriter = BigWig.Writer(output, [(\"chr1\", 12345), (\"chr2\", 9100)])\nwrite(writer, (\"chr1\", 501, 600, 1.0))\nwrite(writer, (\"chr2\", 301, 450, 3.0))\nclose(writer)\n\n\n\n\n\n"
},

{
    "location": "#BigWig.Record",
    "page": "Home",
    "title": "BigWig.Record",
    "category": "type",
    "text": "BigWig.Record()\n\nCreate an unfilled bigWig record.\n\n\n\n\n\n"
},

{
    "location": "#BigWig.chrom",
    "page": "Home",
    "title": "BigWig.chrom",
    "category": "function",
    "text": "chrom(record::Record)::String\n\nGet the chromosome name of record.\n\n\n\n\n\n"
},

{
    "location": "#BigWig.chromid",
    "page": "Home",
    "title": "BigWig.chromid",
    "category": "function",
    "text": "chromid(record::Record)::UInt32\n\nGet the chromosome ID of record.\n\n\n\n\n\n"
},

{
    "location": "#BigWig.chromstart",
    "page": "Home",
    "title": "BigWig.chromstart",
    "category": "function",
    "text": "chromstart(record::Record)::Int\n\nGet the start position of record.\n\n\n\n\n\n"
},

{
    "location": "#BigWig.chromend",
    "page": "Home",
    "title": "BigWig.chromend",
    "category": "function",
    "text": "chromend(record::Record)::Int\n\nGet the end position of record.\n\n\n\n\n\n"
},

{
    "location": "#BigWig.value",
    "page": "Home",
    "title": "BigWig.value",
    "category": "function",
    "text": "value(record::Record)::Float32\n\nGet the value of record.\n\n\n\n\n\n"
},

{
    "location": "#API-1",
    "page": "Home",
    "title": "API",
    "category": "section",
    "text": "BigWig.Reader\nBigWig.chromlist\nBigWig.values\nBigWig.Writer\nBigWig.Record\nBigWig.chrom\nBigWig.chromid\nBigWig.chromstart\nBigWig.chromend\nBigWig.value"
},

]}

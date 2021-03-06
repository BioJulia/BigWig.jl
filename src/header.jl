# BigBed Section Header
# =====================

# Supplemental Table 13.
struct SectionHeader
    chromid::UInt32
    chromstart::UInt32
    chromend::UInt32
    itemstep::UInt32
    itemspan::UInt32
    datatype::UInt8
    reserved::UInt8
    itemcount::UInt16
end

const SECTION_HEADER_SIZE = 24

function isbedgraph(datatype::UInt8)
    return datatype == 0x01
end

function isvarstep(datatype::UInt8)
    return datatype == 0x02
end

function isfixedstep(datatype::UInt8)
    return datatype == 0x03
end

function encode_datatype(datatype::Symbol)
    if datatype == :bedgraph
        return 0x01
    end
    if datatype == :varstep
        return 0x02
    end
    if datatype == :fixedstep
        return 0x03
    end
    throw(ArgumentError("invalid data type: $(datatype)"))
end

function Base.read(io::IO, ::Type{SectionHeader})
    return SectionHeader(
        read(io, UInt32), read(io, UInt32), read(io, UInt32),
        read(io, UInt32), read(io, UInt32),
        read(io, UInt8),  read(io, UInt8),  read(io, UInt16))
end

function Base.write(stream::IO, header::SectionHeader)
    return write(
        stream,
        header.chromid, header.chromstart, header.chromend,
        header.itemstep, header.itemspan, header.datatype,
        header.reserved, header.itemcount)
end

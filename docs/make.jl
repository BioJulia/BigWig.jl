using Pkg
using Documenter, BigWig

makedocs(
    format = Documenter.HTML(
        edit_link = "develop"
    ),
    modules = [BigWig],
    sitename = "BigWig.jl",
    pages = [
        "Home" => "index.md",
        "BigWig" => "man/BigWig.md",
        "API Reference" => "man/api.md"
    ],
    authors = replace(join(Pkg.TOML.parsefile("Project.toml")["authors"], ", "), r" <.*?>" => "" ) * ", The BioJulia Organisation, and other contributors."
)

deploydocs(
    repo = "github.com/BioJulia/BigWig.jl.git",
    devbranch = "develop",
    push_preview = true
)

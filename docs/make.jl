using Pkg; Pkg.develop(PackageSpec(path=pwd())); Pkg.instantiate()

using Documenter, BigWig

makedocs(
    format = Documenter.HTML(
        edit_branch = "develop"
    ),
    sitename = "BigWig.jl",
    pages = [
        "Home" => "index.md",
    ],
    authors = "Kenta Sato, D. C. Jones, Ben J. Ward, The BioJulia Organisation and other contributors."
)
deploydocs(
    repo = "github.com/BioJulia/BigWig.jl.git",
    devbranch = "develop"
)

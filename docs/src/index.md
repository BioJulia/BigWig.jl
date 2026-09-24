# BigWig.jl

[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![Latest Release](https://img.shields.io/github/release/BioJulia/BigWig.jl.svg)](https://github.com/BioJulia/BigWig.jl/releases/latest)
[![DOI](https://zenodo.org/badge/152175873.svg)](https://zenodo.org/badge/latestdoi/152175873)
[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/BioJulia/BigWig.jl/blob/master/LICENSE)
[![Stable documentation](https://img.shields.io/badge/docs-stable-blue.svg)](https://biojulia.github.io/BigWig.jl/stable)
[![Latest documentation](https://img.shields.io/badge/docs-dev-blue.svg)](https://biojulia.github.io/BigWig.jl/dev/)

> This project follows the [semver](http://semver.org) pro forma and uses the [git-flow branching model](https://nvie.com/posts/a-successful-git-branching-model/ "original blog post").

## Description
The BigWig package provides data representation and IO tools for the bigWig file format.
The bigWig format is a binary format for associating floating point numbers with bases of the genome.
The bigWig files are indexed to quickly fetch specific regions.

## Installation
You can install the BigWig package from the [Julia REPL](https://docs.julialang.org/en/v1/manual/getting-started/).
Press `]` to enter [pkg mode](https://docs.julialang.org/en/v1/stdlib/Pkg/), then enter the following command:
```julia
add BigWig
```

If you are interested in the cutting edge of the development, please check out the [develop branch](https://github.com/BioJulia/BigWig.jl/tree/develop) to try new features before release.


## Testing
BigWig is tested against Julia `1.X` on Linux, OS X, and Windows.

**Latest build status of the [develop branch](https://github.com/BioJulia/BigWig.jl/tree/develop):**

[![Unit tests](https://github.com/BioJulia/BigWig.jl/workflows/Unit%20tests/badge.svg?branch=develop)](https://github.com/BioJulia/BigWig.jl/actions?query=workflow%3A%22Unit+tests%22+branch%3Adevelop)
[![Documentation](https://github.com/BioJulia/BigWig.jl/workflows/Documentation/badge.svg?branch=develop)](https://github.com/BioJulia/BigWig.jl/actions?query=workflow%3ADocumentation+branch%3Adevelop)
[![codecov](https://codecov.io/gh/BioJulia/BigWig.jl/branch/develop/graph/badge.svg)](https://codecov.io/gh/BioJulia/BigWig.jl)

## Contributing
We appreciate contributions from users, including reporting bugs, fixing issues, improving performance, and adding new features.

See the [contributing files](https://github.com/BioJulia/Contributing) for detailed contributor and maintainer guidelines and the code of conduct.

## Questions?
If you have a question about contributing or using BioJulia software, join us on [the Julia Slack workspace](https://julialang.org/slack/), or visit the [Bio category on Julia Discourse](https://discourse.julialang.org/c/domain/bio).
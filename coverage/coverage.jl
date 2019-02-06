# Only run coverage on linux with julia v1.0.
get(ENV, "TRAVIS_OS_NAME", "")       == "linux"   || exit()
get(ENV, "TRAVIS_JULIA_VERSION", "") == "1.0" || exit()

using Pkg; Pkg.instantiate()

using Coverage

cd(joinpath(@__DIR__, "..")) do
    # push coverage results to Coveralls
    # Coveralls.submit(Coveralls.process_folder())'
    # push coverage results to Codecov
    Codecov.submit(Codecov.process_folder())'
end

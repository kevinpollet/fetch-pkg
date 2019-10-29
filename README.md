# fetch-pkg <!-- omit in toc -->

[![Build Status](https://github.com/kevinpollet/fetch-pkg/workflows/build/badge.svg)](https://github.com/kevinpollet/fetch-pkg/actions)
[![Coverage Status](https://coveralls.io/repos/github/kevinpollet/fetch-pkg/badge.svg)](https://coveralls.io/github/kevinpollet/fetch-pkg)
[![npm Latest Version](https://img.shields.io/npm/v/fetch-pkg/latest)](https://www.npmjs.com/package/fetch-pkg)
[![npm Downloads](https://img.shields.io/npm/dm/fetch-pkg)](https://www.npmjs.com/package/fetch-pkg)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/github/license/kevinpollet/fetch-pkg)](./LICENSE.md)
[![Twitter Follow](https://img.shields.io/twitter/follow/kevinpollet?style=social)](https://twitter.com/kevinpollet)

Fetch packages from any npm-compatible registries.

<details>
  <summary><strong>Table of Contents</strong> (click to expand)</summary>

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

</details>

## Installation

```shell
$ npm install fetch-pkg --save   # npm
$ yarn add fetch-pkg             # Yarn
```

## Usage

```typescript
import fs from "fs";
import { fetchPkg } from "fetch-pkg";

fetchPkg("fetch-pkg")
  .then(pkg =>
    pkg
      .pipe(fs.createWriteStream("inception.tgz"))
      .once("finish", () => process.exit(0))
  )
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
```

## API

### fetchPkg(name: string, opts?: [Options](#options)): Promise<[Pkg](#pkg)> <!-- omit in toc -->

Fetch a package from an npm-compatible registry and return the fetch package metadata and tarball stream.

### Pkg <!-- omit in toc -->

Extends: `stream.Readable`

#### name <!-- omit in toc -->

- Type: `string`

The fetched package name.

#### version <!-- omit in toc -->

- Type: `string`

The fetched package version.

### Options <!-- omit in toc -->

#### registryURL <!-- omit in toc -->

- Type: `string`
- Default: `https://registry.npmjs.org/`

The package registry URL. For example, to fetch a package from the GitHub Package Registry you should use https://npm.pkg.github.com.

#### token <!-- omit in toc -->

- Type: `string`

The authentication token.

#### version <!-- omit in toc -->

- Type: `string`
- Default: `latest`

The package version to fetch, a valid [semver range](https://github.com/npm/node-semver#ranges) or a [dist tag](https://docs.npmjs.com/cli/dist-tag).

### Errors <!-- omit in toc -->

- `FetchPkgError`: This error is thrown when something went wrong with the HTTP requests.
- `PackageNotFoundError`: This error is thrown when the given package name cannot be found.
- `PackageVersionNotFoundError`: This error is thrown when the given package version cannot be found.

## Contributing

Contributions are welcome!

Want to file a bug, request a feature or contribute some code?

1. Check out the [Code of Conduct](./CODE_OF_CONDUCT.md)
2. Check for an existing [issue](https://github.com/kevinpollet/fetch-pkg) matching your bug or feature request
3. Open an issue describing your bug or feature request
4. Open a pull request if you want to contribute some code.

## License

[MIT](./LICENSE.md) © kevinpollet

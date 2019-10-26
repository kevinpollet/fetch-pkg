# fetch-pkg <!-- omit in toc -->

[![Build Status](https://github.com/kevinpollet/fetch-pkg/workflows/build/badge.svg)](https://github.com/kevinpollet/fetch-pkg/actions)
[![npm Latest Version](https://img.shields.io/npm/v/fetch-pkg/latest)](https://www.npmjs.com/package/fetch-pkg)
[![npm Downloads](https://img.shields.io/npm/dm/fetch-pkg)](https://www.npmjs.com/package/fetch-pkg)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/github/license/kevinpollet/fetch-pkg)](./LICENSE.md)

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

fetchPkg("fastify")
  .then(stream =>
    stream
      .pipe(fs.createWriteStream("fastify.tgz"))
      .once("finish", () => process.exit(0))
  )
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
```

## API

### fetchPkg(name: string, opts?: Options): Promise<NodeJS.ReadableStream> <!-- omit in toc -->

Fetch a package from an npm-compatible registry and return a tarball stream. By default, the `latest` package version is fetched from the [npm](https://www.npmjs.com/) registry: https://registry.npmjs.org/.

### Options <!-- omit in toc -->

#### registryURL <!-- omit in toc -->

- Type: `string`
- Default: `https://registry.npmjs.org/`
- Required: `false`

The package registry URl. For example, to fetch a package from the GitHub Package Registry you should use https://npm.pkg.github.com.

#### token <!-- omit in toc -->

- Type: `string`
- Required: `false`

The authentication token.

#### version <!-- omit in toc -->

- Type: `string`
- Default: `latest`
- Required: `false`

The package version to fetch, a valid [semver range](https://github.com/npm/node-semver#ranges) or a [dist tag](https://docs.npmjs.com/cli/dist-tag).

### Errors <!-- omit in toc -->

- `FetchPkgError`: This error is thrown when something went wrong with the HTTP requests.
- `PackageNotFoundError`: This error is thrown when the given package name cannot be found.
- `PackageVersionNotFoundError`: This error is thrown when the given package name version cannot be found.

## Contributing

Contributions are welcome!

Want to file a bug, request a feature or contribute some code?

1. Check out the [Code of Conduct](./CODE_OF_CONDUCT.md)
2. Check for an existing [issue](https://github.com/kevinpollet/fetch-pkg) matching your bug or feature request
3. Open an issue describing your bug or feature request
4. Open a pull request if you want to contribute some code. For new features changes must be discussed first.

## License

[MIT](./LICENSE.md) © kevinpollet

# fetch-pkg

[![Build Status](https://github.com/kevinpollet/fetch-pkg/workflows/build/badge.svg)](https://github.com/kevinpollet/fetch-pkg/actions)
[![npm Latest Version](https://img.shields.io/npm/v/fetch-pkg/latest)](https://www.npmjs.com/package/fetch-pkg)
[![npm Downloads](https://img.shields.io/npm/dm/fetch-pkg)](https://www.npmjs.com/package/fetch-pkg)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/github/license/kevinpollet/fetch-pkg)](./LICENSE.md)

Fetch Node.js packages from any npm-compatible registries.

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

## Contributing

Contributions are welcome!

Want to file a bug, request a feature or contribute some code?

1. Check out the [Code of Conduct](./CODE_OF_CONDUCT.md)
2. Check for an existing [issue](https://github.com/kevinpollet/fetch-pkg) matching your bug or feature request
3. Open an issue describing your bug or feature request
4. Open a pull request if you want to contribute some code. For new features changes must be discussed first.

## License

[MIT](./LICENSE.md) © kevinpollet

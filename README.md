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

## License

[MIT](./LICENSE.md) © kevinpollet

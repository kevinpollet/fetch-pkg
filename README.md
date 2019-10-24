# fetch-pkg

## Installation

```shell
$ npm install fetch-pkg --save   # npm
$ yarn add fetch-pkg             # yarn
```

## Usage

```typescript
import fs from "fs";
import { fetchPkg } from "fetch-pkg";

const errorHandler = (err: Error) => {
  console.error(err);
  process.exit(1);
};

fetchPkg("fastify")
  .then(stream =>
    stream
      .pipe(fs.createWriteStream("express.tgz"))
      .once("error", errorHandler)
      .once("finish", () => process.exit(0))
  )
  .catch(errorHandler);
```

## License

[MIT](./LICENSE.md) © kevinpollet

/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { FetchPkgError } from "./FetchPkgError";

export class PackageVersionNotFoundError extends FetchPkgError {
  constructor(name: string, version: string) {
    super(404, `Package '${name}' with version '${version}' cannot be found`);
  }
}

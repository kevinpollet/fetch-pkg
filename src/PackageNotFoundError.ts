/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { FetchPkgError } from "./FetchPkgError";

export class PackageNotFoundError extends FetchPkgError {
  constructor(name: string) {
    super(404, `Package '${name}' cannot be found`);
  }
}

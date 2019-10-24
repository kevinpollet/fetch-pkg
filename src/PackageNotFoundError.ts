/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

export class PackageNotFoundError extends Error {
  constructor(name: string) {
    super(`Package '${name}' cannot be found`);
  }
}

/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { PassThrough } from "stream";

export class Pkg extends PassThrough {
  constructor(readonly name: string, readonly version: string) {
    super();
  }
}

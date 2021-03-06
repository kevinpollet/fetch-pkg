/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { PackageVersion } from "./PackageVersion";

export interface Package {
  name: string;
  "dist-tags": Record<string, string>;
  versions: Record<string, PackageVersion>;
}

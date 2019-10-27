/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

export interface Package {
  versions: Record<string, { dist: { tarball: string } }>;
  "dist-tags": Record<string, string>;

  [k: string]: unknown;
}

/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

interface Version {
  dist: {
    integrity: string;
    shasum: string;
    tarball: string;
  };
}

export interface PkgMetadata {
  name: string;
  description: string;
  versions: Record<string, Version>;

  [k: string]: unknown;
}

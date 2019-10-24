/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

interface DistTags extends Record<string, string> {
  latest: string;
}

interface Version {
  dist: {
    integrity: string;
    shasum: string;
    tarball: string;
  };
}

export interface Package extends Record<string, unknown> {
  name: string;
  description: string;
  versions: Record<string, Version>;
  "dist-tags": DistTags;
}

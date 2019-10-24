/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fetch, { json } from "npm-registry-fetch";
import { Options } from "./Options";
import { PkgMetadata } from "./PkgMetadata";

export const fetchPkg = async (
  name: string,
  version: string,
  opts?: Readonly<Options>
): Promise<NodeJS.ReadableStream | undefined> => {
  const { versions } = (await json(name, { ...opts })) as PkgMetadata;
  const pkVersion = versions[version];

  return pkVersion && fetch(pkVersion.dist.tarball).then(res => res.body);
};

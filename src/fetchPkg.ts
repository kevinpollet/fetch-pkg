/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fetch, { json } from "npm-registry-fetch";
import { Options } from "./Options";
import { Package } from "./Package";

export const fetchPkg = async (
  name: string,
  version: string,
  opts?: Readonly<Options>
): Promise<NodeJS.ReadableStream | undefined> => {
  const { versions } = (await json(name, { ...opts })) as Package;
  const packageVersion = versions[version];

  return packageVersion && fetch(packageVersion.dist.tarball, { ...opts }).then(res => res.body);
};

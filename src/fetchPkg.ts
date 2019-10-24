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
  opts?: Readonly<Options>
): Promise<NodeJS.ReadableStream | undefined> => {
  let pkg;
  try {
    pkg = (await json(name, { ...opts })) as Package;
  } catch(err) {
    if (err.statusCode === 404) {
      return undefined;
    }
    throw err;
  }

  const versionToFetch = (opts && opts.version) || pkg["dist-tags"].latest;
  const version = pkg.versions[versionToFetch];

  return (
    version && fetch(version.dist.tarball, { ...opts }).then(res => res.body)
  );
};

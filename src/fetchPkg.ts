/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fetch, { json } from "npm-registry-fetch";
import { maxSatisfying } from "semver";
import { Options } from "./Options";
import { Package } from "./Package";
import { PackageNotFoundError } from "./PackageNotFoundError";
import { PackageVersionNotFoundError } from "./PackageVersionNotFoundError";

export const fetchPkg = async (
  name: string,
  opts?: Readonly<Options>
): Promise<NodeJS.ReadableStream> => {
  let pkg;
  try {
    pkg = (await json(name, { ...opts })) as Package;
  } catch (err) {
    throw err.statusCode === 404 ? new PackageNotFoundError(name) : err;
  }

  const versionNumbers = Object.keys(pkg.versions);
  const versionNumber =
    opts && opts.version
      ? maxSatisfying(versionNumbers, opts.version)
      : pkg["dist-tags"].latest;

  const version = versionNumber && pkg.versions[versionNumber];
  if (!version) {
    throw new PackageVersionNotFoundError(
      name,
      (opts && opts.version) || "latest"
    );
  }

  return fetch(version.dist.tarball, { ...opts }).then(res => res.body);
};

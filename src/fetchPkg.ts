/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import makeFetch from "make-fetch-happen";
import { escape } from "querystring";
import { maxSatisfying } from "semver";
import { resolve } from "url";
import { Options } from "./Options";
import { Package } from "./Package";
import { FetchPkgError } from "./FetchPkgError";
import { PackageNotFoundError } from "./PackageNotFoundError";
import { PackageVersionNotFoundError } from "./PackageVersionNotFoundError";

export const fetchPkg = async (
  name: string,
  opts: Readonly<Options> = {}
): Promise<NodeJS.ReadableStream> => {
  const encodedName = escape(name);
  const version = opts.version || "latest";
  const registryURL = opts.registryURL || "https://registry.npmjs.org/";
  const fetch = makeFetch.defaults({
    headers: { authorization: opts.token && `Bearer ${opts.token}` }
  });

  const pkg: Package = await fetch(resolve(registryURL, encodedName)).then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (res: any) =>
      res.status === 200
        ? res.json()
        : Promise.reject(
            res.status === 404
              ? new PackageNotFoundError(name)
              : new FetchPkgError(res.status, res.statusText)
          )
  );

  let versionNumber: string | null = pkg["dist-tags"][version];
  if (!versionNumber) {
    const versionNumbers = Object.keys(pkg.versions);
    versionNumber = maxSatisfying(versionNumbers, version);

    if (!versionNumber) {
      throw new PackageVersionNotFoundError(name, version);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return fetch(pkg.versions[versionNumber].dist.tarball).then((res: any) =>
    res.status !== 200
      ? Promise.reject(new FetchPkgError(res.status, res.statusText))
      : res.body
  );
};

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
import { Pkg } from "./Pkg";
import { FetchPkgError } from "./FetchPkgError";
import { PackageNotFoundError } from "./PackageNotFoundError";
import { PackageVersionNotFoundError } from "./PackageVersionNotFoundError";

export const fetchPkg = async (
  name: string,
  opts: Readonly<Options> = {}
): Promise<Pkg> => {
  const escapedName = escape(name);
  const { version, registryURL, token } = {
    version: "latest",
    registryURL: "https://registry.npmjs.org/",
    ...opts
  };
  const fetch = makeFetch.defaults({
    headers: {
      accept: "application/vnd.npm.install-v1+json",
      authorization: token && `Bearer ${token}`
    }
  });

  const pkg: Package = await fetch(resolve(registryURL, escapedName)).then(
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

  const { name: pkgName, version: pkgVersion, dist } = pkg.versions[
    versionNumber
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return fetch(dist.tarball).then((res: any) =>
    res.status !== 200
      ? Promise.reject(new FetchPkgError(res.status, res.statusText))
      : res.body.pipe(new Pkg(pkgName, pkgVersion))
  );
};

/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import nock from "nock";
import { escape } from "querystring";
import { resolve } from "url";
import { Package } from "../src/Package";
import {
  fetchPkg,
  PackageNotFoundError,
  PackageVersionNotFoundError,
  FetchPkgError
} from "../src";

describe("fetchPkg", () => {
  const pkgName = "awesome-package";
  const scopedPkgName = "@scope/awesome-package";
  const npmRegistryURL = "https://registry.npmjs.org/";

  const pkg = (registryURL?: string): Package => {
    const tarball = resolve(registryURL || npmRegistryURL, "/tarball.tgz");

    return {
      "dist-tags": {
        latest: "2.1.0",
        beta: "2.0.0-beta.5"
      },
      versions: {
        "2.1.0": { dist: { tarball } },
        "2.0.0": { dist: { tarball } },
        "2.0.0-beta.5": { dist: { tarball } }
      }
    };
  };

  afterEach(() => nock.cleanAll());

  it("should fetch the latest version of the given package by default", () => {
    const scope = nock(npmRegistryURL)
      .get("/tarball.tgz")
      .reply(200)
      .get(`/${pkgName}`)
      .reply(200, pkg());

    return expect(fetchPkg(pkgName))
      .resolves.toBeDefined()
      .then(() => scope.done());
  });

  it("should fetch the latest version of the given scoped package by default", () => {
    const scope = nock(npmRegistryURL)
      .get("/tarball.tgz")
      .reply(200)
      .get(`/${escape(scopedPkgName)}`)
      .reply(200, pkg());

    return expect(fetchPkg(scopedPkgName))
      .resolves.toBeDefined()
      .then(() => scope.done());
  });

  it("should fetch the given package version", () => {
    const scope = nock(npmRegistryURL)
      .get("/tarball.tgz")
      .reply(200)
      .get(`/${pkgName}`)
      .reply(200, pkg());

    return expect(fetchPkg(pkgName, { version: "2.0.0" }))
      .resolves.toBeDefined()
      .then(() => scope.done());
  });

  it("should fetch the given package matching the version range", () => {
    const scope = nock(npmRegistryURL)
      .get("/tarball.tgz")
      .reply(200)
      .get(`/${pkgName}`)
      .reply(200, pkg());

    return expect(fetchPkg(pkgName, { version: "^2.0.0" }))
      .resolves.toBeDefined()
      .then(() => scope.done());
  });

  it("should fetch the given package dist tag version", () => {
    const scope = nock(npmRegistryURL)
      .get("/tarball.tgz")
      .reply(200)
      .get(`/${pkgName}`)
      .reply(200, pkg());

    return expect(fetchPkg(pkgName, { version: "beta" }))
      .resolves.toBeDefined()
      .then(() => scope.done());
  });

  it("should fetch the given package from the configured registry", () => {
    const registryURL = "https://myregistry.org/";
    const scope = nock(registryURL)
      .get("/tarball.tgz")
      .reply(200)
      .get(`/${pkgName}`)
      .reply(200, pkg(registryURL));

    return expect(fetchPkg(pkgName, { registryURL }))
      .resolves.toBeDefined()
      .then(() => scope.done());
  });

  it("should fetch the given package with the configured token", () => {
    const token = "dummy";
    const scope = nock(npmRegistryURL, {
      reqheaders: { authorization: `Bearer ${token}` }
    })
      .get("/tarball.tgz")
      .reply(200)
      .get(`/${pkgName}`)
      .reply(200, pkg());

    return expect(fetchPkg(pkgName, { token }))
      .resolves.toBeDefined()
      .then(() => scope.done());
  });

  it("should throw an error if the given package does not exist", () => {
    const scope = nock(npmRegistryURL)
      .get(`/${pkgName}`)
      .reply(404);

    return expect(fetchPkg(pkgName))
      .rejects.toThrowError(PackageNotFoundError)
      .then(() => scope.done());
  });

  it("should throw an error if the given package version does not exist", () => {
    const scope = nock(npmRegistryURL)
      .get(`/${pkgName}`)
      .reply(200, pkg());

    return expect(fetchPkg(pkgName, { version: "3.0.0" }))
      .rejects.toThrowError(PackageVersionNotFoundError)
      .then(() => scope.done());
  });

  it("should throw an error if the given package dist tag version does not exist", () => {
    const scope = nock(npmRegistryURL)
      .get(`/${pkgName}`)
      .reply(200, pkg());

    return expect(fetchPkg(pkgName, { version: "alpha" }))
      .rejects.toThrowError(PackageVersionNotFoundError)
      .then(() => scope.done());
  });

  it("should throw an error if the given package version range does not match a version", () => {
    const scope = nock(npmRegistryURL)
      .get(`/${pkgName}`)
      .reply(200, pkg());

    return expect(fetchPkg(pkgName, { version: "^3.0.0" }))
      .rejects.toThrowError(PackageVersionNotFoundError)
      .then(() => scope.done());
  });

  it("should throw an error if the package cannot be fetched", () => {
    const scope = nock(npmRegistryURL)
      .get(`/${pkgName}`)
      .reply(401);

    return expect(fetchPkg(pkgName))
      .rejects.toThrowError(FetchPkgError)
      .then(() => scope.done());
  });

  it("should throw an error if the package tarball cannot be fetched", () => {
    const scope = nock(npmRegistryURL)
      .get("/tarball.tgz")
      .reply(404)
      .get(`/${pkgName}`)
      .reply(200, pkg());

    return expect(fetchPkg(pkgName))
      .rejects.toThrowError(FetchPkgError)
      .then(() => scope.done());
  });
});

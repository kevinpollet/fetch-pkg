/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import nock from "nock";
import { fetchPkg } from "../src/fetchPkg";
import { PackageNotFoundError } from "../src/PackageNotFoundError";
import { PackageVersionNotFoundError } from "../src/PackageVersionNotFoundError";

describe("fetchPkg", () => {
  const npmRegistryURL = "https://registry.npmjs.org/";

  it("should throw an error if the given package does not exist", () => {
    const scope = nock(npmRegistryURL)
      .get("/missing")
      .reply(404);

    expect(fetchPkg("missing"))
      .rejects.toThrowError(PackageNotFoundError)
      .then(() => expect(scope.isDone()).toBeTruthy());
  });

  it("should throw an error if the given package version does not exist", () => {
    const scope = nock(npmRegistryURL)
      .get("/missing")
      .reply(200, {
        "dist-tags": { latest: "1.0.0" },
        versions: { "1.0.0": {} }
      });

    expect(fetchPkg("missing", { version: "1.0.1" }))
      .rejects.toThrowError(PackageVersionNotFoundError)
      .then(() => expect(scope.isDone()).toBeTruthy());
  });

  it("should fetch the latest version of the given package in the default registry", () => {
    const scope = nock(npmRegistryURL)
      .get("/dummy.tgz")
      .reply(200)
      .get("/dummy")
      .reply(200, {
        "dist-tags": { latest: "1.0.0" },
        versions: {
          "1.0.0": { dist: { tarball: `${npmRegistryURL}dummy.tgz` } }
        }
      });

    expect(fetchPkg("dummy"))
      .resolves.toBeDefined()
      .then(() => expect(scope.isDone()).toBeTruthy());
  });

  it("should fetch the given package in the configured registry", () => {
    const registryURL = "https://myregistry.npmjs.org/";
    const scope = nock(registryURL)
      .get("/dummy.tgz")
      .reply(200)
      .get("/dummy")
      .reply(200, {
        "dist-tags": { latest: "1.0.0" },
        versions: { "1.0.0": { dist: { tarball: `${registryURL}dummy.tgz` } } }
      });

    expect(fetchPkg("dummy", { registryURL }))
      .resolves.toBeDefined()
      .then(() => expect(scope.isDone()).toBeTruthy());
  });

  it("should fetch the given package in the configured registry with the configured token", () => {
    const token = "dsgfjkguiegzigfoighflhsjfpodusfueeh82678";
    const scope = nock(npmRegistryURL, {
      reqheaders: { authorization: `Bearer ${token}` }
    })
      .get("/dummy.tgz")
      .reply(200)
      .get("/dummy")
      .reply(200, {
        "dist-tags": { latest: "1.0.0" },
        versions: {
          "1.0.0": { dist: { tarball: `${npmRegistryURL}dummy.tgz` } }
        }
      });

    expect(fetchPkg("dummy", { token }))
      .resolves.toBeDefined()
      .then(() => expect(scope.isDone()).toBeTruthy());
  });
});

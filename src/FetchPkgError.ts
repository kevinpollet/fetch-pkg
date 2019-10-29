/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

export class FetchPkgError extends Error {
  readonly statusCode: number;
  readonly statusMessage: string;

  constructor(statusCode: number, statusMessage: string) {
    super(`${statusCode} — ${statusMessage}`);
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
  }
}

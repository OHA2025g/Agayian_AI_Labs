import { describe, expect, it } from "vitest";
import { databaseUriMissingName } from "./seed-site";

describe("databaseUriMissingName", () => {
  it("flags a URI with no database path", () => {
    expect(
      databaseUriMissingName(
        "mongodb://mongo:secret@host:27017/?tls=false",
      ),
    ).toBe(true);
  });

  it("accepts a URI with a database name", () => {
    expect(
      databaseUriMissingName(
        "mongodb://mongo:secret@host:27017/agrayian?authSource=admin",
      ),
    ).toBe(false);
  });

  it("is not missing when DB_NAME is set", () => {
    const previous = process.env.DB_NAME;
    process.env.DB_NAME = "agrayian";
    expect(databaseUriMissingName()).toBe(false);
    if (previous === undefined) delete process.env.DB_NAME;
    else process.env.DB_NAME = previous;
  });
});

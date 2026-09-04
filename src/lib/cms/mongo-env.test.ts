import { afterEach, describe, expect, it } from "vitest";
import {
  applyDatabaseName,
  mongoUrlMissingDatabasePath,
  readDatabaseName,
  resolveMongoUri,
} from "./mongo-env";

const keys = ["MONGO_URL", "DATABASE_URI", "DATABASE_URL", "DB_NAME"] as const;
const previous = new Map<string, string | undefined>();

function setEnv(values: Partial<Record<(typeof keys)[number], string | undefined>>) {
  for (const key of keys) {
    if (!previous.has(key)) previous.set(key, process.env[key]);
    const value = values[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

afterEach(() => {
  for (const key of keys) {
    const value = previous.get(key);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  previous.clear();
});

describe("applyDatabaseName", () => {
  it("inserts DB_NAME into an EasyPanel URL with no path", () => {
    expect(
      applyDatabaseName(
        "mongodb://mongo:secret@agrayian_ai_labs_agrayian:27017/?tls=false",
        "agrayian",
      ),
    ).toBe(
      "mongodb://mongo:secret@agrayian_ai_labs_agrayian:27017/agrayian?tls=false&authSource=admin",
    );
  });

  it("replaces an existing path with DB_NAME", () => {
    expect(
      applyDatabaseName("mongodb://127.0.0.1:27017/test", "agrayian"),
    ).toBe("mongodb://127.0.0.1:27017/agrayian");
  });
});

describe("resolveMongoUri", () => {
  it("prefers MONGO_URL and requires DB_NAME", () => {
    setEnv({
      MONGO_URL: "mongodb://mongo:secret@mongo-host:27017/?tls=false",
      DATABASE_URI: "mongodb://ignored:27017/old",
      DB_NAME: "agrayian",
    });
    expect(resolveMongoUri()).toBe(
      "mongodb://mongo:secret@mongo-host:27017/agrayian?tls=false&authSource=admin",
    );
  });

  it("throws when DB_NAME is missing", () => {
    setEnv({
      MONGO_URL: "mongodb://127.0.0.1:27017",
      DB_NAME: undefined,
    });
    expect(() => resolveMongoUri()).toThrow(/DB_NAME is required/);
  });

  it("skips Mongo during image builds", () => {
    setEnv({ MONGO_URL: undefined, DB_NAME: undefined });
    expect(resolveMongoUri({ skipPayload: true })).toBe(
      "mongodb://127.0.0.1:27017/agrayian-build-skip",
    );
  });
});

describe("readDatabaseName", () => {
  it("rejects an invalid name", () => {
    setEnv({ DB_NAME: "../etc" });
    expect(() => readDatabaseName(true)).toThrow(/letters/);
  });
});

describe("mongoUrlMissingDatabasePath", () => {
  it("flags host-only EasyPanel URLs", () => {
    expect(
      mongoUrlMissingDatabasePath(
        "mongodb://mongo:secret@host:27017/?tls=false",
      ),
    ).toBe(true);
  });
});

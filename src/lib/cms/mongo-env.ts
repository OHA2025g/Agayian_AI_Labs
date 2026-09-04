const DB_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;

export class MongoEnvError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MongoEnvError";
  }
}

/** EasyPanel-style host URL, or a full Payload DATABASE_URI. */
export function rawMongoUrl(): string {
  return (
    process.env.MONGO_URL?.trim() ||
    process.env.DATABASE_URI?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    ""
  );
}

export function mongoUrlMissingDatabasePath(uri: string): boolean {
  try {
    const parsed = new URL(uri);
    return parsed.pathname === "/" || parsed.pathname === "";
  } catch {
    return false;
  }
}

export function applyDatabaseName(uri: string, dbName: string): string {
  const parsed = new URL(uri);
  parsed.pathname = `/${dbName}`;
  if (parsed.username && !parsed.searchParams.has("authSource")) {
    parsed.searchParams.set("authSource", "admin");
  }
  return parsed.toString();
}

export function readDatabaseName(required: boolean): string {
  const name = process.env.DB_NAME?.trim();
  if (name) {
    if (!DB_NAME_PATTERN.test(name)) {
      throw new MongoEnvError(
        "DB_NAME must start with a letter and use only letters, numbers, _ or -.",
      );
    }
    return name;
  }
  if (!required) {
    return "agrayian-build-skip";
  }
  throw new MongoEnvError(
    "DB_NAME is required. Set it on the web service (for example agrayian) so Mongo creates that database for this site.",
  );
}

export function resolveMongoUri(options?: { skipPayload?: boolean }): string {
  if (options?.skipPayload) {
    return "mongodb://127.0.0.1:27017/agrayian-build-skip";
  }

  const raw = rawMongoUrl();
  if (!raw) {
    throw new MongoEnvError(
      "MONGO_URL (or DATABASE_URI) is required. Paste the Mongo service URL from EasyPanel.",
    );
  }

  return applyDatabaseName(raw, readDatabaseName(true));
}

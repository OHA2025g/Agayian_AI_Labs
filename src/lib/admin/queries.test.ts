import { afterEach, describe, expect, it } from "vitest";
import { loadCollectionList, loadGlobal, loadVersions } from "./queries";

describe("admin queries during Docker build", () => {
  const previous = process.env.SKIP_PAYLOAD;

  afterEach(() => {
    if (previous === undefined) delete process.env.SKIP_PAYLOAD;
    else process.env.SKIP_PAYLOAD = previous;
  });

  it("does not throw when Payload is skipped", async () => {
    process.env.SKIP_PAYLOAD = "1";
    await expect(loadCollectionList("faqs")).resolves.toEqual({
      docs: [],
      total: 0,
    });
    await expect(loadGlobal("capabilities-page")).resolves.toEqual({});
    await expect(loadVersions("global", "capabilities-page")).resolves.toEqual(
      [],
    );
  });
});

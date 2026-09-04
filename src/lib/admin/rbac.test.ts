import { describe, expect, it } from "vitest";
import {
  adminCanManageUsers,
  adminCanOpenCms,
  adminCanPublish,
  mapAdminUser,
  toUiRole,
} from "./rbac";

describe("admin rbac", () => {
  it("maps publisher and administrator to Administrator", () => {
    expect(toUiRole("publisher")).toBe("Administrator");
    expect(toUiRole("administrator")).toBe("Administrator");
    expect(toUiRole("editor")).toBe("Editor");
    expect(toUiRole("enquiry_manager")).toBe("Editor");
  });

  it("only administrators publish or manage users", () => {
    const editor = mapAdminUser({ id: "1", email: "e@x.com", role: "editor" });
    const admin = mapAdminUser({
      id: "2",
      email: "a@x.com",
      role: "administrator",
    });
    expect(adminCanPublish(editor)).toBe(false);
    expect(adminCanPublish(admin)).toBe(true);
    expect(adminCanManageUsers(editor)).toBe(false);
    expect(adminCanManageUsers(admin)).toBe(true);
  });

  it("keeps native CMS for super_admin only", () => {
    const superAdmin = mapAdminUser({
      id: "3",
      email: "s@x.com",
      role: "super_admin",
    });
    const admin = mapAdminUser({
      id: "4",
      email: "a@x.com",
      role: "administrator",
    });
    expect(adminCanOpenCms(superAdmin)).toBe(true);
    expect(adminCanOpenCms(admin)).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { locales } from "../src/lib/locales";
import { copy } from "../src/lib/copy";
import {
  articleHelpContext,
  EMAIL_HREF,
  GRIEVANCE_HREF,
  helpOptions,
  MARKETPLACE_HREF,
  TICKETS_HREF,
  PHONE_HREF,
  SUPPORT_PHONE,
  SUPPORT_EMAIL,
} from "../src/lib/support";

describe("contextual help destinations", () => {
  it("keeps public phone and email links consistent across the help centre", () => {
    expect(SUPPORT_EMAIL).toBe("contact@fairswap.in");
    expect(SUPPORT_PHONE).toBe("+91 8826599917");
    expect(EMAIL_HREF).toBe("mailto:contact@fairswap.in");
    expect(PHONE_HREF).toBe("tel:+918826599917");
  });

  it("offers email without signed-in tickets when account access fails", () => {
    expect(
      articleHelpContext({ id: "create-account", category: "account" }),
    ).toBe("account");
    for (const locale of locales) {
      const c = copy(locale);
      const help = helpOptions(c, "account");
      expect(help.description).toBe(c.accountHelpText);
      expect(help.actions.map((action) => action.href)).toEqual([EMAIL_HREF]);
      expect(c.emailSupport.length).toBeGreaterThan(2);
    }
  });

  it("keeps reporting, cyber safety, and formal grievance journeys distinct", () => {
    const c = copy("en");
    expect(
      helpOptions(c, "report").actions.map((action) => action.href),
    ).toEqual([MARKETPLACE_HREF, EMAIL_HREF]);
    expect(helpOptions(c, "safety").actions.map((a) => a.href)).toEqual([
      EMAIL_HREF,
    ]);
    expect(
      helpOptions(c, "grievance").actions.map((action) => action.href),
    ).toEqual([GRIEVANCE_HREF]);
  });

  it("lets existing users use tickets and everyone use email", () => {
    const c = copy("en");
    expect(
      helpOptions(c, "general").actions.map((action) => action.href),
    ).toEqual([EMAIL_HREF, TICKETS_HREF]);
    expect(helpOptions(c, "general").description).toBe(c.generalHelpText);
    expect(
      helpOptions(c, "ticket").actions.map((action) => action.href),
    ).toEqual([TICKETS_HREF, EMAIL_HREF]);
  });
});

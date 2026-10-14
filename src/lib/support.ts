import type { Article } from "./content";
import type { Copy } from "./copy";

export const SUPPORT_EMAIL = "contact@fairswap.in";
export const EMAIL_HREF = `mailto:${SUPPORT_EMAIL}`;
export const TICKETS_HREF = "https://fairswap.in/account/support";
export const GRIEVANCE_HREF = "https://fairswap.in/grievance";
export const MARKETPLACE_HREF = "https://fairswap.in";

export type HelpContext =
  | "general"
  | "account"
  | "ticket"
  | "report"
  | "safety"
  | "grievance";

export function articleHelpContext(
  article: Pick<Article, "id" | "category">,
): HelpContext {
  if (article.id === "create-account") return "account";
  if (article.id === "grievance-redressal") return "grievance";
  if (article.id === "report-a-listing") return "report";
  if (article.id === "submit-support-ticket") return "ticket";
  if (article.category === "safety-scams" || article.id === "safe-meetup")
    return "safety";
  return "general";
}

export type HelpAction = {
  href: string;
  label: string;
  isEmail?: boolean;
};

export function helpOptions(
  c: Copy,
  context: HelpContext,
): { description: string; actions: HelpAction[] } {
  const email: HelpAction = {
    href: EMAIL_HREF,
    label: c.emailSupport,
    isEmail: true,
  };
  const ticket: HelpAction = { href: TICKETS_HREF, label: c.support };
  switch (context) {
    case "account":
      return { description: c.accountHelpText, actions: [email] };
    case "ticket":
      return { description: c.supportText, actions: [ticket, email] };
    case "report":
      return {
        description: c.reportText,
        actions: [{ href: MARKETPLACE_HREF, label: c.marketplace }, email],
      };
    case "safety":
      return { description: c.safetyText, actions: [email] };
    case "grievance":
      return {
        description: c.grievanceText,
        actions: [{ href: GRIEVANCE_HREF, label: c.grievance }],
      };
    default:
      return { description: c.generalHelpText, actions: [email, ticket] };
  }
}

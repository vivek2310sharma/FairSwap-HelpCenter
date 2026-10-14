// Only Vercel preview and local development may expose editorial drafts.
// An arbitrary environment toggle can never publish drafts in production.
export const preview =
  process.env.VERCEL_ENV === "preview" ||
  (!process.env.VERCEL && process.env.VERCEL_ENV !== "production");
export const origin = "https://help.fairswap.in";

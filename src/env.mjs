import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    // DATABASE_URL: z.string().url(),
    OPENAI_API_KEY: z.string().min(1),
    YELP_CLIENT_ID: z.string().min(1),
    YELP_API_KEY: z.string().min(1),
    YELP_API_ENDPOINT: z.string().url(),
    IPINFO_TOKEN: z.string().min(1),
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // DATABASE_URL: process.env.DATABASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    YELP_CLIENT_ID: process.env.YELP_CLIENT_ID,
    YELP_API_KEY: process.env.YELP_API_KEY,
    YELP_API_ENDPOINT: process.env.YELP_API_ENDPOINT,
    NODE_ENV: process.env.NODE_ENV,
    IPINFO_TOKEN: process.env.IPINFO_TOKEN,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

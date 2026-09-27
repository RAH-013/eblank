import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { ConfigService } from "@nestjs/config";

export function createAuth(config: ConfigService) {
  const pool = new Pool({
    connectionString: config.getOrThrow<string>("databaseUrl"),
  });

  return betterAuth({
    database: pool,
    secret: config.getOrThrow<string>("betterAuth.secret"),
    baseURL: config.getOrThrow<string>("betterAuth.url"),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: config.getOrThrow<string>("betterAuth.google.clientId"),
        clientSecret: config.getOrThrow<string>(
          "betterAuth.google.clientSecret",
        ),
      },
    },
  });
}

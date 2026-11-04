import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { createAuth } from "./auth";
import { AuthController } from "./auth.controller";
import { BETTER_AUTH } from "./auth.constants";

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide: BETTER_AUTH,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => createAuth(config),
    },
  ],
  exports: [BETTER_AUTH],
})
export class AuthModule {}

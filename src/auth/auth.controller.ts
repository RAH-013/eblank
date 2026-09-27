import { Controller, Get, Inject, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";

import { createAuth } from "./auth";
import { BETTER_AUTH } from "./auth.constants";

type Auth = ReturnType<typeof createAuth>;

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(BETTER_AUTH)
    private readonly auth: Auth,
  ) {}

  @Post("sign-up/email")
  signUpEmail(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  @Post("sign-in/email")
  signInEmail(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  @Get("get-session")
  getSession(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  @Post("sign-out")
  signOut(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  @Post("sign-in/social")
  signInSocial(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  @Get("callback/google")
  googleCallback(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  private async handle(req: Request, res: Response) {
    const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

    const headers = new Headers();

    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        headers.set(key, Array.isArray(value) ? value.join(",") : value);
      }
    }

    const response = await this.auth.handler(
      new Request(url, {
        method: req.method,
        headers,
        body:
          req.method === "GET" || req.method === "HEAD"
            ? undefined
            : JSON.stringify(req.body),
      }),
    );

    res.status(response.status);

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.send(await response.text());
  }
}

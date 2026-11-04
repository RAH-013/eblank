import { Avatar, Style } from "@dicebear/core";
import initials from "@dicebear/styles/initials.json" with { type: "json" };
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

  @Post("sign-in/social")
  signInSocial(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  @Post("sign-out")
  signOut(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  @Get("get-session")
  getSession(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  @Get("get-avatar")
  async getAvatar(@Req() req: Request, @Res() res: Response) {
    const session = await this.auth.api.getSession({
      headers: this.getHeaders(req),
    });

    if (!session) {
      return res.status(401).json({
        message: "No authenticated session",
      });
    }

    if (session.user.image) {
      return res.redirect(session.user.image);
    }

    const avatar = this.generateAvatar(session.user.name);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "private, max-age=86400");

    return res.send(avatar);
  }

  @Get("callback/google")
  googleCallback(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  private generateAvatar(seed: string) {
    const style = new Style(initials);

    return new Avatar(style, {
      seed,
      size: 128,
    }).toString();
  }

  private getHeaders(req: Request) {
    const headers = new Headers();

    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        headers.set(key, Array.isArray(value) ? value.join(",") : value);
      }
    }

    return headers;
  }

  @Post("request-password-reset")
  requestPasswordReset(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  @Post("reset-password")
  resetPassword(@Req() req: Request, @Res() res: Response) {
    return this.handle(req, res);
  }

  private async handle(req: Request, res: Response) {
    const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const headers = this.getHeaders(req);

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

    const body = await response.text();

    if (response.headers.get("content-type")?.includes("application/json")) {
      const data = JSON.parse(body);

      if (data.user && !data.user.image) {
        data.user.image = `${req.protocol}://${req.get("host")}/api/auth/get-avatar`;
      }

      return res.json(data);
    }

    return res.send(body);
  }
}

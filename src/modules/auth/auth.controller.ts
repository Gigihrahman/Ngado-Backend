import { injectable } from "tsyringe";
import { AuthService } from "./auth.service";
import { NextFunction, Request, Response } from "express";

@injectable()
export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.login(req.body);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };
}

import { injectable } from "tsyringe";

import { PrismaService } from "../prisma/prisma.service";
import { LoginDTO } from "./dto/login.dto";
import { ApiError } from "../../utils/api-error";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { JWT_SECRET_KEY } from "../../config";

@injectable()
export class AuthService {
  private prisma: PrismaService;
  private passwordService: PasswordService;
  private tokenService: TokenService;
  constructor(
    PrismaClient: PrismaService,
    PasswordService: PasswordService,
    TokenService: TokenService
  ) {
    this.prisma = PrismaClient;
    this.passwordService = PasswordService;
    this.tokenService = TokenService;
  }

  login = async (body: LoginDTO) => {
    const { email, password } = body;
    const existingser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingser) {
      throw new ApiError("User not found", 404);
    }
    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      existingser.password
    );
    if (!isPasswordValid) {
      throw new ApiError("Invalid credentials", 400);
    }
    const accessToken = this.tokenService.generateToken(
      { id: existingser.id },
      JWT_SECRET_KEY!,
      { expiresIn: "2h" }
    );
    const { password: pw, ...user } = existingser;

    return {
      accessToken,
      user,
    };
  };
}

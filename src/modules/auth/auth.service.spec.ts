import { createMockContext, MockContext, Context } from "../../../test/context";
import { AuthService } from "./auth.service";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

describe("sampleService", () => {
  let mockCtx: MockContext;
  let ctx: Context;
  let authService: AuthService;
  let mockPasswordService: PasswordService;
  let mockTokenService: TokenService;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockPasswordService = {} as PasswordService;
    mockTokenService = {} as TokenService;
    authService = new AuthService(
      mockCtx.prisma,
      mockPasswordService,
      mockTokenService
    );
  });

  describe("login", () => {
    it("should return accessToken and user when credentials are valid", async () => {
      const mockUser = {
        id: "1",
        email: "test@example.com",
        password: "hashedPassword",
        name: "Test User",
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = "mock-jwt-token";

      mockCtx.prisma.user.findUnique.mockResolvedValue(mockUser);

      mockPasswordService.comparePassword = jest.fn().mockResolvedValue(true);

      mockTokenService.generateToken = jest.fn().mockReturnValue(mockToken);

      const result = await authService.login({
        email: "test@example.com",
        password: "password123",
      });

      expect(mockCtx.prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });

      expect(mockPasswordService.comparePassword).toHaveBeenCalledWith(
        "password123",
        "hashedPassword"
      );

      expect(mockTokenService.generateToken).toHaveBeenCalled();
      expect(result).toEqual({
        accessToken: mockToken,
        userWithoutPassword: {
          id: "1",
          email: "test@example.com",
          name: "Test User",
          role: Role.USER,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      });
    });

    it("should throw error when user is not found", async () => {
      mockCtx.prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.login({
          email: "nonexistent@example.com",
          password: "password123",
        })
      ).rejects.toThrow("User not found");
    });

    it("should throw error when password is invalid", async () => {
      const mockUser = {
        id: "1",
        email: "test@example.com",
        password: "hashedPassword",
        name: "Test User",
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCtx.prisma.user.findUnique.mockResolvedValue(mockUser);
      mockPasswordService.comparePassword = jest.fn().mockResolvedValue(false);

      await expect(
        authService.login({
          email: "test@example.com",
          password: "wrongpassword",
        })
      ).rejects.toThrow("Invalid credentials");
    });
  });
});

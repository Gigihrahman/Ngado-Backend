import argon2 from "argon2";

export class PasswordService {
  hashPassword = async (password: string) => {
    return await argon2.hash(password);
  };

  comparePassword = async (plainPassword: string, hashedPassword: string) => {
    return await argon2.verify(hashedPassword, plainPassword);
  };
}

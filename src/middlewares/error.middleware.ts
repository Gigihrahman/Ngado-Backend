import type { NextFunction, Request, Response } from "express";
import type { ApiError } from "../utils/api-error";

export const errorMiddleware = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).send({ message });
};

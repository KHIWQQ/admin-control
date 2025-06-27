import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secret = process.env.JWT_SECRET!;
const expires = process.env.JWT_EXPIRES || "1d";

export const hash = (pw: string) => bcrypt.hash(pw, 12);
export const compare = bcrypt.compare;

export function sign(payload: object) {
  return jwt.sign(payload, secret, { expiresIn: expires });
}

export function verify<T = any>(token: string) {
  try {
    return jwt.verify(token, secret) as T;
  } catch {
    return null;
  }
}

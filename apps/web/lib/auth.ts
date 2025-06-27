import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function getCurrentUser() {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as any;
  } catch {
    return null;
  }
}

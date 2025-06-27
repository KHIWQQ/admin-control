import { Router } from "express";
import User from "../models/User.js";
import { hash, compare, sign } from "../utils/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Credential'
 *     responses:
 *       200:
 *         description: Successfully registered
 */
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "missing" });

  if (await User.exists({ email }))
    return res.status(409).json({ msg: "exists" });

  const user = await User.create({
    email,
    password: await hash(password)
  });
  res.json({ id: user.id });
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Credential'
 *     responses:
 *       200:
 *         description: Logged in
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await compare(password, user.password)))
    return res.status(401).json({ msg: "bad creds" });

  const token = sign({ id: user.id, email: user.email });
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24
    })
    .json({ ok: true });
});

export default router;

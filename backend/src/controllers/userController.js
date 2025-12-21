import prisma from "../config/prisma.js";
import { signToken } from "../utils/jwt.js";
export const setRole = async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ message: "Email and role required" });
    }

    const user = await prisma.user.update({
      where: { email },
      data: { role },
    });

    // NEW JWT WITH ROLE
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to set role" });
  }
};

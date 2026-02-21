import prisma from "../config/prisma.js";
import { signToken } from "../utils/jwt.js";

export const setRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    // 🔐 Get user from JWT
    const userId = req.user.userId;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    

    // Issue new JWT with updated role
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
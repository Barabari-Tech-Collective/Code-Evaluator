import prisma from "../config/prisma.js";
import { signToken } from "../utils/jwt.js";

export const googleSignup = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let isNewUser = false;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if(!user){
       user = await prisma.user.create({
        data: { name, email },
      });
      isNewUser = true;
    }

    // const user = await prisma.user.upsert({
    //   where: { email },
    //   update: { name },
    //   create: { name, email },
    // });
    const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    });

    res.status(200).json({ 
      token,
      user,
      isNewUser});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google signup failed" });
  }
};

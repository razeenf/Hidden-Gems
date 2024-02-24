import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

// Endpoint to save or unsave a post to/from user's saved posts
router.post("/toggleSave", async (req, res) => {
  try {
    const { postId, save } = req.body;
    const userId = req.user.id; // Assuming you have middleware to extract user from request //this may not work without middleware so we can pass userId in req

    if (save) {
      // Save the post
      await prisma.user.update({
        where: { id: userId },
        data: {
          posts: {
            connect: { id: postId },
          },
        },
      });
    } else {
      // Unsave the post
      await prisma.user.update({
        where: { id: userId },
        data: {
          posts: {
            disconnect: { id: postId },
          },
        },
      });
    }

    res.status(200).json({
      message: save
        ? "Post saved successfully"
        : "Post removed from saved successfully",
    });
  } catch (error) {
    console.error("Error managing saved post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while managing the saved post" });
  }
});

export default router;

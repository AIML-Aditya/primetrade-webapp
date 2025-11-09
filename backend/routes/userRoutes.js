import express from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js"
import User from "../models/User.js";

const router = express.Router();

router.get("/me", AuthMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;

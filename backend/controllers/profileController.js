import User from "../models/User.js";

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // hide password
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI not found in .env");
    }

    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
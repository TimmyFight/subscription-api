/* eslint-disable no-undef */
import mongoose from "mongoose";
import { NODE_ENV, DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the DB_URI inside .env.<environment>.local file"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`MongoDB connected in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("MongoDB connection error:", error);

    process.exit(1);
  }
};

export default connectToDatabase;

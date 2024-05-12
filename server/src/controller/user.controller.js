import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// Register User
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  if (
    ![username, email, password].every((field) => field && field.trim() !== "")
  ) {
    throw new ApiError(
      400,
      "Username, email, and password are required fields."
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "This email address is already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    isAdmin,
  });

  res.status(201).json({
    message: "User registered successfully.",
    data: newUser,
  });
});

// Sign-in User
const signinUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const userDetails = await User.findOne({ email });
  if (!userDetails) {
    throw new ApiError(401, "User with this email address does not exist.");
  }

  const matchPassword = await bcrypt.compare(password, userDetails.password);
  if (!matchPassword) {
    throw new ApiError(401, "Incorrect password. Please try again.");
  }

  const token = await generateToken(userDetails._id);
  if (!token) {
    throw new ApiError(500, "Failed to generate authentication token.");
  }

  res.status(200).json({
    message: "User signed in successfully.",
    token,
    createdAt: new Date(),
    success: true,
  });
});

export { registerUser, signinUser };

import {
  signinBodyValidator,
  signupBodyValidator,
  updateBodyValidator,
} from "../config/validation.js";
import { User } from "../models/user.model.js";
import { Account } from "../models/account.model.js";

const signup = async (req, res) => {
  try {
    const { success } = signupBodyValidator.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body || Incorrect inputs",
      });
    }

    const { username, firstName, lastName, password } = req.body;

    // Check for existing user by username only
    const existedUser = await User.findOne({ username });
    if (existedUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({ username, firstName, lastName, password });
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while registering user",
      });
    }

    // Create account for the user
    await Account.create({
      user: createdUser._id,
      balance: 1 + Math.random() * 10000,
    });

    return res.status(201).json({
      success: true,
      user: createdUser,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { success } = signinBodyValidator.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body || Incorrect inputs",
      });
    }

    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const accessToken = user.generateAccessToken();
    const loggedInUser = await User.findById(user._id).select("-password");

    if (!loggedInUser) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while logging in",
      });
    }

    // Set cookie
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none", // Required for cross-site requests
    };

    return res.status(200).cookie("accessToken", accessToken, options).json({
      success: true,
      user: loggedInUser,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none", // Required for cross-site requests
  };

  return res.status(200).clearCookie("accessToken", options).json({
    success: true,
    message: "User logged out successfully",
  });
};

const updateUser = async (req, res) => {
  try {
    const { success } = updateBodyValidator.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body || Incorrect inputs",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true } // Return the updated document
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const filter = req.query.filter?.trim() || "";

    const users = await User.find({
      $or: [
        { firstName: { $regex: new RegExp(filter, "i") } },
        { lastName: { $regex: new RegExp(filter, "i") } },
        { username: { $regex: new RegExp(filter, "i") } },
      ],
    }).select("-password");

    return res.status(200).json({
      success: true,
      users,
      message: users.length > 0 ? "Users found successfully" : "No users found",
    });
  } catch (error) {
    console.error("Search user error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.user,
    message: "User fetched successfully",
  });
};

export { signup, signin, updateUser, searchUser, logout, getCurrentUser };

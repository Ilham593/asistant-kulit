import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
export const register = async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();

    if (!username || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .json({ msg: "Username must be at least 3 characters long" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      msg: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
      token,
    });
  } catch (error) {
    console.log("Error registering user:", error);
    res.status(500).json({ msg: error.message });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.log("Error logging in user:", error);
    res.status(500).json({ msg: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id, username } = req.user;

    res.status(200).json({
      id,
      username,
    });
  } catch (error) {
    console.log("Error getting profile:", error);
    res.status(500).json({ msg: "Gagal mengambil data profile" });
  }
};

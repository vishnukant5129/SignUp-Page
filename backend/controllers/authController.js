import User from "../models/user.js";
import bcrypt from "bcrypt"
import generateToken from "../utils/token.js";

export const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ success: false, message: "Email already registered" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const error = {
        success: false,
        message: "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character"
    };

    if (!/[A-Z]/.test(password)) return res.status(400).json(error);
    if (!/[a-z]/.test(password)) return res.status(400).json(error);
    if (!/[0-9]/.test(password)) return res.status(400).json(error);
    if (!/[!@#$%^&*]/.test(password)) return res.status(400).json(error);
    if (/\s/.test(password)) return res.status(400).json(error);
    if (password.length < 8) return res.status(400).json(error);

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        email,
        password: hashedPassword
    });

    return res.status(200).json({ success: true, message: "Signup successful" });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
        success: true,
        message: "Login successful",
        token
    });
};

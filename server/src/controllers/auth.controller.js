const User = require("../models/user");
const jwt = require("jsonwebtoken");

/* ---------------- JWT Helper ---------------- */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );
};

/* ---------------- CUSTOMER SIGNUP ---------------- */
exports.customerSignup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: "customer",
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Customer signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------------- CUSTOMER LOGIN ---------------- */
exports.customerLogin = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      role: "customer",
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No account found. Please sign up first.",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------------- VENDOR SIGNUP ---------------- */
exports.vendorSignup = async (req, res) => {
  try {
    const { name, email, phone, password, storeName } = req.body;

    if (!name || !email || !phone || !password || !storeName) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const exists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const vendor = await User.create({
      name,
      email,
      phone,
      password,
      role: "vendor",
      storeName,
    });

    const token = generateToken(vendor._id);

    return res.status(201).json({
      success: true,
      message: "Vendor signup successful",
      token,
      user: {
        id: vendor._id,
        name: vendor.name,
        role: vendor.role,
        storeName: vendor.storeName,
      },
    });

  } catch (err) {
    console.error("VENDOR SIGNUP ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------------- VENDOR LOGIN ---------------- */
exports.vendorLogin = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const vendor = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      role: "vendor",
    }).select("+password");

    if (!vendor) {
      return res.status(401).json({
        success: false,
        message: "No account found. Please sign up first.",
      });
    }

    const match = await vendor.matchPassword(password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(vendor._id);

    return res.status(200).json({
      success: true,
      message: "Vendor login successful",
      token,
      user: {
        id: vendor._id,
        name: vendor.name,
        role: vendor.role,
        storeName: vendor.storeName,
      },
    });

  } catch (err) {
    console.error("VENDOR LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
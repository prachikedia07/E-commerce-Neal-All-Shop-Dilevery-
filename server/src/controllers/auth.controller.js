const User = require("../models/User");
const jwt = require("jsonwebtoken");

/* ---------------- JWT Helper ---------------- */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

/* ---------------- SIGNUP (CUSTOMER) ---------------- */
exports.customerSignup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: "customer",
    });

    res.status(201).json({
      message: "Customer signup successful",
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
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- LOGIN ---------------- */
exports.customerLogin = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({
  $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
  role: "customer",
}).select("+password");


    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* -------- VENDOR SIGNUP -------- */
exports.vendorSignup = async (req, res) => {
  try {
    const { name, email, phone, password, storeName } = req.body;

    if (!name || !email || !phone || !password || !storeName) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (exists) {
      return res.status(409).json({ message: "Vendor already exists" });
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

    res.status(201).json({
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
    res.status(500).json({ message: err.message });
  }
};

/* -------- VENDOR LOGIN -------- */
exports.vendorLogin = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const vendor = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      role: "vendor",
    }).select("+password");

    if (!vendor) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await vendor.matchPassword(password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(vendor._id);

    res.status(200).json({
      message: "Vendor login successful",
      token,
      user: {
        id: vendor._id,
        name: vendor.name,
        role: vendor.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

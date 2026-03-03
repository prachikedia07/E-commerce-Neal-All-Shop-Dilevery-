const Product = require("../models/product");

/* ===============================
   GET INVENTORY LIST
================================ */
exports.getInventory = async (req, res) => {
  try {
    const products = await Product.find({
      vendor: req.user._id,
    }).sort({ updatedAt: -1 });

    const inventoryData = products.map((p) => ({
      _id: p._id,
      name: p.name,
      sku: p._id.toString().slice(-6).toUpperCase(), // simple SKU
      stock: p.stock,
      minStock: p.minStock,
      isLowStock: p.stock <= p.minStock,
      lastUpdated: p.updatedAt,
    }));

    res.json({
      success: true,
      inventory: inventoryData,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
};


/* ===============================
   UPDATE STOCK (Adjust)
================================ */
exports.updateStock = async (req, res) => {
  try {
    const { change } = req.body; // +10 or -5

    const product = await Product.findOne({
      _id: req.params.id,
      vendor: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.stock += change;

    if (product.stock < 0) product.stock = 0;

    // if (product.stock === 0) {
    //   product.isAvailable = false;
    // }

    product.stockLogs.push({
      change,
      newStock: product.stock,
      updatedBy: req.user._id,
    });

    await product.save();

    res.json({
      success: true,
      stock: product.stock,
    });

  } catch (err) {
    res.status(500).json({ message: "Stock update failed" });
  }
};

exports.setStock = async (req, res) => {
  try {
    const { stock } = req.body;

    const product = await Product.findOne({
      _id: req.params.id,
      vendor: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const changeAmount = stock - product.stock;

    product.stock = stock;

    product.stockLogs.push({
      change: changeAmount,
      newStock: stock,
      updatedBy: req.user._id,
    });

    await product.save();

    res.json({
      success: true,
      stock: product.stock,
    });

  } catch (err) {
    res.status(500).json({ message: "Stock set failed" });
  }
};
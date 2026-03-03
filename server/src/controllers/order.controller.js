const Order = require("../models/order");
const Product = require("../models/product");

exports.createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      deliveryAddress,
      items,
      paymentMethod,
    } = req.body;

    let totalAmount = 0;

    for (const item of items) {
      totalAmount += item.price * item.quantity;
    }

    const order = await Order.create({
      vendor: req.user._id,
      customerName,
      customerPhone,
      deliveryAddress,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
  console.log(err);
  res.status(500).json({ message: err.message });
}
};

exports.getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      vendor: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Accepted",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      vendor: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // prevent double delivery stock reduction
    if (order.status !== "Delivered" && status === "Delivered") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }

      if (order.paymentMethod === "COD") {
        order.paymentStatus = "Paid";
      }
    }

    order.status = status;

    await order.save();

    res.json({ success: true, order });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
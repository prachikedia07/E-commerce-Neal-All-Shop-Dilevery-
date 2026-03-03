const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth.middleware");
const orderController = require("../controllers/order.controller");

router.use(protect, authorize("vendor"));

router.post("/", orderController.createOrder);
router.get("/", orderController.getVendorOrders);
router.put("/:id/status", orderController.updateOrderStatus);

module.exports = router;
const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");

router.use(protect, authorize("vendor"));

router.post("/", productController.createProduct);
router.get("/", productController.getVendorProducts);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
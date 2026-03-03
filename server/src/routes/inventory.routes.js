const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth.middleware");
const inventoryController = require("../controllers/inventory.controller");

router.use(protect, authorize("vendor"));

router.get("/", inventoryController.getInventory);
router.put("/:id/adjust", inventoryController.updateStock);
router.put("/:id/set", inventoryController.setStock);

module.exports = router;
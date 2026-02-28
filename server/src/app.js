const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const customerRoutes = require("./routes/customer.routes");
const vendorRoutes = require("./routes/vendor.routes");
const productRoutes = require("./routes/product.routes");


const app = express();
app.use(express.json());
app.use(cors());

app.post("/test", (req, res) => {
  res.json({ ok: true });
});


app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/vendor/products", productRoutes);

module.exports = app;

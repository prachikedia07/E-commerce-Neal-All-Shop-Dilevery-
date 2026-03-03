const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountedPrice: {
      type: Number,
    },

    category: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    minStock: {
      type: Number,
      default: 5,   // low stock threshold
    },

    stockLogs: [
      {
        change: Number,         // +10 or -3
        newStock: Number,
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    image: {
      type: String,
    },

    isVeg: {
  type: Boolean,
  default: true,
},

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* AUTO: If stock is 0 → mark unavailable */
// productSchema.pre("save", function () {
//   if (this.stock === 0) {
//     this.isAvailable = false;
//   }
// });

module.exports = mongoose.model("Product", productSchema);
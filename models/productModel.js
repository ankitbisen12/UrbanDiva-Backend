const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: "String", required: true, unique: true },
    description: { type: "String", required: true },
    price: {
      type: Number,
      min: [0, "Wrong min price"],
      max: [10000, "Wrong max price"],
    },
    categories: {
      type: String,
      enum: ["Women", "Men", "Accessories"],
    },
    discountPercentage: {
      type: Number,
      min: [1, "wrong min discount"],
      max: [99, "wrong max discount"],
    },
    rating: {
      type: mongoose.Schema.Types.Decimal128,
      min: [0, "wrong min rating"],
      max: [5, "wrong max rating"],
    },
    stock: {
      type: Number,
      min: [0, "wrong min stock"],
      max: [50, "wrong max stock"],
    },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    colors: { type: [mongoose.Schema.Types.Mixed] },
    sizes: { type: [mongoose.Schema.Types.Mixed] },
    highlights: { type: [String] },
    discountPrice: { type: Number },
    packagingCharge: { type: Number },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProductSchema.virtual("id").get(function () {
  return this._id;
});

ProductSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

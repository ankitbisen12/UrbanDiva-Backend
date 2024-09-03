const mongoose = require("mongoose");

const FavouritesSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.objectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.objectId,
    ref: "User",
    required: true,
  },
});

FavouritesSchema.virtual("id").get(function () {
  return this._id;
});

Favourite.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Favourite = mongoose.model("Favourite", FavouritesSchema);

export default Favourite;

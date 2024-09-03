const Favourite = require("../models/favouriteModel");

//when you are using this route in frontend using reduxApi then don't forgot to send the entire product object so that product can be populate
exports.addToFavouriteByUserId = async (req, res) => {
  const { id } = req.user;
  const newItemToFavourite = await Favourite.create({ ...req.body, user: id });
  const result = await newItemToFavourite.populate("product");
  res.status(201).json(result);
};

exports.fetchfavouriteByUserId = async (req, res) => {
  try {
    const { id } = req.user;
    const favouriteItem = await Favourite.find({ user: id }).populate(
      "product"
    );
    res.status(200).json(favouriteItem);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.removeFromFavourite = async (req, res) => {
  try {
    const item = await Favourite.findByIdAndDelete(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json(error);
  }
};

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sanitizer } = require("../utils/common");

exports.createUser = catchAsync(async (req, res) => {
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      // console.log('req.body.name', req.body.name);
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
        salt,
      });

      //whenever new user is created then login that new User.
      req.login(sanitizer(newUser), (err) => {
        if (err) {
          res.status(400).json(err);
        } else {
          const token = jwt.sign(sanitizer(newUser), process.env.JWT_SECRET_KEY);
          res
            .cookie("jwt", token, {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true,
            })
            .status(201)
            .json({ id: newUser.id, role: newUser.id });
        }
      });
    }
  );
  // res.status(200).json(newUser);
});

exports.loginUser = catchAsync(async (req, res) => {
  const user = req.user;
  res
    .cookie("jwt", user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({ id: user.id, role: user.role });
});

exports.checkAuth = catchAsync(async (req, res) => {
  if (req.user) {
    console.log("Running checkAuth");
    console.log("req.user", req.user);
    res.json(req.user);
  } else {
    console.log("sendStatus running", req);
    res.sendStatus(401);
  }
});

const express = require("express");
const app = express(); //framework for node.js =>object conatin method and variables.
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const cors = require("cors"); //for cross platform
const productRouter = require("./routes/productRoutes");
const brandRouter = require("./routes/brandRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRouter = require("./routes/orderRoutes");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/userModel");
const path = require("path");
const { sanitizer, cookieExtractor, isAuth } = require("./utils/common");

//router imports below

//Middlewares
// app.use(
//   cors({
//     exposedHeaders: ['X-Total-Count'],
//   })
// );

//JWT options
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

app.use(express.static(path.resolve(__dirname, "build")));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

app.use(passport.authenticate("session"));
app.use(cors());
app.use(express.json()); //to parse req.body //returns an Object.
app.use(morgan("dev")); //for development

app.use("/api/v1/products", productRouter); //we can use Jwt token for client-only auth
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes); //no need to check authentication
app.use("/api/v1/cart",isAuth(), cartRoutes);
app.use('/api/v1/orders',isAuth(), orderRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      //by default passport uses username
      const user = await User.findOne({ email: email });

      if (!user) {
        done(null, false, { message: "invalid credentials" });
      }

      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid credentials" }); //this line sends to serialize
          }
          const token = jwt.sign(sanitizer(user), process.env.JWT_SECRET_KEY);
          done(null, { id: user.id, role: user.role, token });
        }
      );
    } catch (err) {
      // console.log(err);
      done(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizer(user)); //this call serializer
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

//this creates session variables req.user on being called from callback
passport.serializeUser(function (user, cb) {
  console.log("Serializer");
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      role: user.role,
    });
  });
});

//this change session variable req.user when called from authorized request.
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.all("*", (req, res, next) => {
  console.log(`Can't find ${req.originalUrl} on this server`, 404);
});

module.exports = app;

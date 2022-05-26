const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const ApiError = require("../utils/apiErrors");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const generateToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EPIRED_TIME,
  });
};

exports.signUp = asyncHandler(async (req, res, next) => {
  // Create User
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //Create token
  const token = generateToken(user._id);
  res.status(201).json({ data: user, token });
});

exports.logIn = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Email or password incorrect", 401));
  }
  const token = generateToken(user._id);
  res.status(200).json({ data: user, token });
});

exports.auth = asyncHandler(async (req, res, next) => {
  // 1) check if token exist, if exists hold it
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "");
  }
  if (!token) {
    return next(
      new ApiError("UnAuthorized User, please login with valid Account", 401)
    );
  }
  // 2) verify token (no change happend, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3) check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError("The user that belong to this token no longer exist")
    );
  }
  // 4) check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passwordToTimeStamps = parseInt(
      currentUser.passwordChangedAt / 1000,
      10
    );
    if (passwordToTimeStamps > decoded.iat) {
      return next(
        new ApiError("User recentlly changed password please login again")
      );
    }
  }
  req.user = currentUser;
  next();
});

exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("This user not allowed to user this route", 403)
      );
    }
    next()
  });

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  // 1) get user by email
  const user = await User.findOne({ email: req.body.email})
  if(!user){
    return next(new ApiError("No user with this email", 404));
  }
  // 2) If user exist , generate 6 random numbers and save it to db 
  // 3) send the reset code via email
})

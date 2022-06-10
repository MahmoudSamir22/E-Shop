const crypto = require("crypto");

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const ApiError = require("../utils/apiErrors");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const { sanitizeUser } = require('../utils/sanitizeData')
const User = require("../models/user.model");

const {generateToken} = require('../middlewares/generateToken')

exports.signUp = asyncHandler(async (req, res, next) => {
  // Create User
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //Create token
  const token = generateToken(user._id);
  res.status(201).json({ data: sanitizeUser(user), token });
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
        new ApiError("This user not allowed to use this route", 403)
      );
    }
    next();
  });

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  // 1) get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("No user with this email", 404));
  }
  // 2) If user exist , generate 6 random numbers and save it to db
  const resetCode = (Math.floor(Math.random() * 900000) + 10000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpirs = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();

  const message = `Hi ${user.name}, \nWe have recived a request to change the password on your E-Shop account. \n ${resetCode}`;

  // 3) send the reset code via email
  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Code (Valid for 10 mins)",
      message,
    });
  } catch (error) {
    user.passwordResetCode = undefined;
    user.passwordResetExpirs = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    return next(new ApiError("There was an Error sending this email", 500));
  }

  res
    .status(200)
    .json({ status: "success", message: "Rest code sent to email" });
});

exports.verifyResetCode = asyncHandler(async (req, res, next) => {
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpirs: { $gte: Date.now() },
  });
  if (!user) {
    return next(new ApiError("Reset code invalid or expired", 400));
  }
  user.passwordResetVerified = true;
  await user.save();
  res.status(200).json({ status: "success" });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("No user found with this email", 404));
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError("Reset Code not verified", 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpirs = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  
  const token = generateToken(user._id)
  res.status(200).json({token})
});

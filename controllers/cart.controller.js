const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const Coupon = require("../models/coupon.model");

const calcTotalCartPrice = (cart) => {
  let productTotalPrice = 0;
  cart.cartItems.forEach((item) => {
    productTotalPrice += item.price * item.quantity;
  });
  cart.totalCartPrice = productTotalPrice;
  cart.totlaPriceAfterDiscount = undefined;
  return productTotalPrice;
};

// @desc Add product to cart
// @route POST /api/v1/cart
// @access Private/User

exports.addProductToCart = asyncHandler(async (req, res) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, color, price: product.price }],
    });
    console.log(cart);
  } else {
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );
    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;

      cart.cartItems[productIndex] = cartItem;
    } else {
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }

  const totalPrice = calcTotalCartPrice(cart);
  cart.totalCartPrice = totalPrice;
  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc Get cart items
// @route GET /api/v1/cart
// @access Private/User
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(
      new ApiError(`Ther is no cart for this user id: ${req.user._id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc Remove product from cart
// @route PUT /api/v1/cart
// @access Private/User

exports.removeCartItem = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.id } },
    },
    { new: true }
  );
  calcTotalCartPrice(cart);
  await cart.save();
  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc Clear user cart
// @route DELETE /api/v1/cart
// @access Private/User

exports.clearUserCart = asyncHandler(async (req, res, next) => {
  await Cart.findOneAndDelete({ user: req.user.id });
  res.status(204).json();
});

// @desc Update Cart item quantity
// @route PUT /api/v1/cart
// @access Private/User
exports.updateCartItmeQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ApiError("There is no cart for this user", 404));
  }
  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.id
  );
  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(
      new ApiError(`there is no item for this id: ${req.params.id}`, 404)
    );
  }
  calcTotalCartPrice(cart);
  await cart.save();
  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc Apply coupon on cart
// @route POST /api/v1/cart/applyCoupon
// @access Private/User

exports.applyCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    name: req.body.coupon,
    expires: { $gte: Date.now() },
  });
  if (!coupon) {
    return next(new ApiError("Coupon Invaled or  expired ", 404));
  }
  const cart = await Cart.findOne({ user: req.user._id });

  const totalPrice = cart.totalCartPrice;
  const priceAfterDiscount = (
    totalPrice -
    (totalPrice * coupon.discount) / 100
  ).toFixed(2);
  cart.totlaPriceAfterDiscount = priceAfterDiscount;
  await cart.save();
  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

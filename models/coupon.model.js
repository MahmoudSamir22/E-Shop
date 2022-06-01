const mongoose = require("mongoose");

const couponShcema = new mongoose.Schema({
    name: { 
        type: String,
        trim: true,
        required: [true, 'Coupon name is required'],
        unique: true
    },
    expires: {
        type: Date,
        required: [true, 'Expiration date is required']
    },
    discount: {
        type: Number,
        required: [true, 'Discount amount is required']
    }
}, {timestamps: true})

const Coupon = mongoose.model('Coupon', couponShcema)

module.exports = Coupon
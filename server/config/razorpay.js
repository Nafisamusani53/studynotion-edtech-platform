const Razorpay = require('razorpay')

console.log("RAZORPAY_KEY:", process.env.RAZORPAY_KEY); // for debugging

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
})

module.exports = { instance }
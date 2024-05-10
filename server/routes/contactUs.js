const express =require("express");
const { contactUs } = require("../controller/contactUs");
const router = express.Router();

router.post("/contact", contactUs)

module.exports = router
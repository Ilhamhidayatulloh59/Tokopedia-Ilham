const router = require("express").Router();

const { productControllers } = require("../controllers");


router.get("/all", productControllers.findAllProduct);


module.exports = router;
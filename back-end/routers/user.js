const router = require("express").Router();

const { userControllers } = require("../controllers");

const { verifyToken, checkRole } = require("../middleware/user");


router.post("/login", userControllers.login);
router.post("/register", userControllers.register);
router.get("/", userControllers.findAllUser);
router.post("/updatePass", verifyToken, userControllers.updatePassword)
router.get("/keepLogin", userControllers.keepLogin)
router.post("/verification", verifyToken, userControllers.verification);
router.post("/forgotpassword", userControllers.sendEmailForgotPass);
router.post("/changeotp", userControllers.changeOtp);


module.exports = router;
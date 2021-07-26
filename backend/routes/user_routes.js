const router = require("express").Router();
const userController = require("../controllers/user-controller");

// endpoints that deal with logging in
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;

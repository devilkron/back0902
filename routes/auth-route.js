const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authController = require("../controllers/auth-controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/student",authController.student)

router.get("/me", authenticate, authController.GETME); //protect route
module.exports = router;

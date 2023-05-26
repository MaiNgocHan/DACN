const authControllers = require("../controllers/authControllers");
const middlewareController = require("../middleware/middlewareControllers");

const router = require('express').Router();


router.post("/register", authControllers.registerUser)
router.post("/login", authControllers.loginUser)

router.post("/logout" ,middlewareController.verifyToken, authControllers.logoutUser)
module.exports = router;


const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const middlewareController = require("../middleware/middlewareControllers");

// get all users
router.get("/" ,middlewareController.verifyToken ,userControllers.getAllUsers);
// delete user by admin
router.delete("/:id",middlewareController.verifyTokenAdmin,userControllers.deleteUser);
// change status by admin
router.put("/:id/changeStatus",middlewareController.verifyTokenAdmin ,userControllers.changeStatus);


module.exports = router;
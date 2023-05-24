const router = require("express").Router();
const newsControllers = require("../controllers/newsController");
const middlewareController = require("../middleware/middlewareControllers");

// get all news
router.get("/", middlewareController.verifyToken ,newsControllers.getAllNews);
// get create news
router.post("/createNews",newsControllers.createNews);
// get delete news
router.delete("/:id",middlewareController.verifyTokenAdmin,newsControllers.deleteNews);

module.exports = router;
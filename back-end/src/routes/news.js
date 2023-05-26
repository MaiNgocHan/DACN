const router = require("express").Router();
const newsControllers = require("../controllers/newsController");
const middlewareController = require("../middleware/middlewareControllers");

// get all news
router.get("/", middlewareController.verifyToken ,newsControllers.getAllNews);
// get Toan news
router.get("/mathNews", middlewareController.verifyToken ,newsControllers.getToanNews);
// get Van news
router.get("/literNews", middlewareController.verifyToken ,newsControllers.getVanNews);
// get Anh news
router.get("/englishNews", middlewareController.verifyToken ,newsControllers.getAnhNews);
// get Anh news
router.get("/otherhNews", middlewareController.verifyToken ,newsControllers.getOtherNews);


// get delete news
router.delete("/:id",middlewareController.verifyTokenAdmin,newsControllers.deleteNews);





// get create news
router.post("/createNews",newsControllers.createNews);
// // get create news
// router.post("/createNewsAnh",newsControllers.createNewsAnh);
// // get create news
// router.post("/createNewsToan",newsControllers.createNewsToan);
// // get create news
// router.post("/createNewsVan",newsControllers.createNewsVan);
module.exports = router;
const router = require("express").Router()

const Product = require("../controller/productController")

const upload = require("../middlewares/uploader")
const authenticate = require("../middlewares/authenticate")
const checkOwnership = require("../middlewares/checkOwnership")
const checkBody = require("../middlewares/checkBody")
const checkRole = require("../middlewares/checkRole")

router.post(
	"/",
	authenticate,
	checkOwnership(true),
	upload.single("image"),
	checkBody(["name", "price", "stock"]),
	Product.createProduct
)
router.get("/", Product.findProducts)
router.get("/:id", Product.findProductById)
router.patch(
	"/:id",
	authenticate,
	checkRole("Owner"),
	checkOwnership(false),
	upload.single("image"),
	Product.updateProduct
)
router.delete(
	"/:id",
	authenticate,
	checkRole("Owner"),
	checkOwnership(false),
	Product.deleteProduct
)

module.exports = router

const router = require("express").Router()

const Shop = require("../controller/shopController")

const authenticate = require("../middlewares/authenticate")
const checkRole = require("../middlewares/checkRole")
const checkBody = require("../middlewares/checkBody")

router.post(
	"/",
	authenticate,
	checkRole("Owner"),
	checkBody(["name", "userId", "productId"]),
	Shop.createShop
)
router.get("/", Shop.findShops)
router.get("/:id", Shop.findShopById)
router.patch("/:id", authenticate, checkRole("Owner"), Shop.updateShop)
router.delete("/:id", authenticate, checkRole("Owner"), Shop.deleteShop)

module.exports = router

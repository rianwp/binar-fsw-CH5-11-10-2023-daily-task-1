const router = require("express").Router()

const User = require("../controller/userController")

const authenticate = require("../middlewares/authenticate")
const checkUser = require("../middlewares/checkUser")

router.get("/", User.findUsers)
router.get("/:id", User.findUserById)
router.patch("/:id", authenticate, checkUser, User.updateUser)
router.delete("/:id", authenticate, checkUser, User.deleteUser)

module.exports = router

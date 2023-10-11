const router = require("express").Router()

const Auth = require("../controller/authController")

router.post("/register", Auth.register)
router.post("/ogin", Auth.login)

module.exports = router

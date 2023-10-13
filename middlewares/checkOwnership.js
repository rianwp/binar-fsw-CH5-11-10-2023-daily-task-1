const { Shop } = require("../models")
const ApiError = require("../utils/apiError")

module.exports = async (req, res, next) => {
	try {
		const shop = await Shop.findOne({
			where: {
				productId: req.params.id,
			},
		})
		if (req.user.id != shop.userId) {
			next(
				new ApiError(`kamu bukan pemilik toko ini jadi tidak bisa akses`, 401)
			)
		}
		next()
	} catch (err) {
		next(new ApiError(err.message, 500))
	}
}

const { Shop } = require("../models")
const ApiError = require("../utils/apiError")

checkOwnerShip = (checkOwnershipOnly) => {
	return async (req, res, next) => {
		try {
			if (checkOwnershipOnly) {
				const shop = await User.findOne({
					where: {
						userId: req.user.id,
					},
				})

				if (!shop) {
					next(
						new ApiError(`kamu belum memiliki toko jadi tidak bisa akses`, 401)
					)
				}
			} else {
				const shop = await Shop.findOne({
					where: {
						productId: req.params.id,
					},
				})

				if (req.user.id != shop.userId) {
					next(
						new ApiError(
							`kamu bukan pemilik toko ${shop.name} jadi tidak bisa akses`,
							401
						)
					)
				}
			}
			next()
		} catch (err) {
			next(new ApiError(err.message, 500))
		}
	}
}

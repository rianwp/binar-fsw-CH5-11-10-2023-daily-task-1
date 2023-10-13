const ApiError = require("../utils/apiError")

module.exports = (req, res, next) => {
	try {
		if (req.user.id != req.params.id) {
			next(
				new ApiError(
					`kamu tidak boleh mengubah atau menghapus data user dengan id ${req.params.id}`,
					401
				)
			)
		}
		next()
	} catch (err) {
		next(new ApiError(err.message, 500))
	}
}

const { User } = require("../models")
const ApiError = require("../utils/apiError")

// const createUser = async (req, res, next) => {
// 	const { name, age, address, role } = req.body

// 	try {
// 		const newUser = await User.create({
// 			name,
// 			age,
// 			address,
// 			role,
// 		})

// 		res.status(200).json({
// 			status: "Success",
// 			data: {
// 				newUser,
// 			},
// 		})
// 	} catch (err) {
// 		next(new ApiError(err.message, 400))
// 	}
// }

const findUsers = async (req, res, next) => {
	try {
		const users = await User.findAll({
			include: ["Auth", "Shop", "Products"],
		})

		res.status(200).json({
			status: "Success",
			data: {
				users,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const findUserById = async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				id: req.params.id,
			},
			include: ["Auth", "Shop", "Products"],
		})

		res.status(200).json({
			status: "Success",
			data: {
				user,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const updateUser = async (req, res, next) => {
	const { name, age, address, role, shopId } = req.body
	try {
		await User.update(
			{
				name,
				age,
				address,
				role,
				shopId,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		)

		res.status(200).json({
			status: "Success",
			message: "sukses update user",
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const deleteUser = async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				id: req.params.id,
			},
		})

		if (!user) {
			next(new ApiError("User id tersebut gak ada", 404))
		}

		await User.destroy({
			where: {
				id: req.params.id,
			},
		})

		res.status(200).json({
			status: "Success",
			message: "sukses delete user",
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

module.exports = {
	findUsers,
	findUserById,
	updateUser,
	deleteUser,
}

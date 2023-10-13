const { Product } = require("../models")
const imagekit = require("../lib/imagekit")
const ApiError = require("../utils/apiError")

const createProduct = async (req, res, next) => {
	const { name, price, stock } = req.body
	const file = req.file
	let img

	try {
		if (file) {
			// dapatkan extension file nya
			const split = file.originalname.split(".")
			const extension = split[split.length - 1]

			// upload file ke imagekit
			const uploadedImage = await imagekit.upload({
				file: file.buffer,
				fileName: `IMG-${Date.now()}.${extension}`,
			})
			img = uploadedImage.url
		}

		const newProduct = await Product.create({
			name,
			price,
			stock,
			imageUrl: img,
			userId: req.user.id,
		})

		res.status(200).json({
			status: "Success",
			data: {
				newProduct,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const findProducts = async (req, res, next) => {
	try {
		const products = await Product.findAll({
			include: ["Shops", "User"],
		})

		res.status(200).json({
			status: "Success",
			data: {
				products,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const findProductById = async (req, res, next) => {
	try {
		const product = await Product.findOne({
			where: {
				id: req.params.id,
			},
			include: ["Shops", "User"],
		})

		res.status(200).json({
			status: "Success",
			data: {
				product,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const updateProduct = async (req, res, next) => {
	const { name, price, stock } = req.body
	const file = req.file
	let img
	const updatedProduct = {
		name,
		price,
		stock,
	}

	try {
		if (file) {
			// dapatkan extension file nya
			const split = file.originalname.split(".")
			const extension = split[split.length - 1]

			// upload file ke imagekit
			const uploadedImage = await imagekit.upload({
				file: file.buffer,
				fileName: `IMG-${Date.now()}.${extension}`,
			})
			img = uploadedImage.url
		}

		if (img) {
			updatedProduct.imageUrl = img
		}

		await Product.update(updatedProduct, {
			where: {
				id: req.params.id,
			},
		})

		res.status(200).json({
			status: "Success",
			message: "sukses update produk",
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const deleteProduct = async (req, res, next) => {
	try {
		const product = await Product.findOne({
			where: {
				id: req.params.id,
			},
		})

		if (!product) {
			next(new ApiError("Product id tersebut gak ada", 404))
		}

		await Product.destroy({
			where: {
				id: req.params.id,
			},
		})

		res.status(200).json({
			status: "Success",
			message: "sukses delete produk",
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

module.exports = {
	createProduct,
	findProducts,
	findProductById,
	updateProduct,
	deleteProduct,
}

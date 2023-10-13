"use strict"
const bcrypt = require("bcrypt")
const { User, Auth } = require("../models")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const saltRounds = 10
		const hashedPassword = bcrypt.hashSync("admin", saltRounds)

		const ownerUsers = []
		for (let i = 1; i <= 5; i++) {
			const user = {
				name: `Owner ${i}`,
				age: 30 + i,
				address: `Alamat ${i}`,
				role: "Owner",
			}

			const auth = {
				email: `owner${i}@example.com`,
				password: hashedPassword,
				confirmPassword: hashedPassword,
			}

			ownerUsers.push({ user, auth })
		}

		const createdOwnerUsers = []
		for (const userData of ownerUsers) {
			const newUser = await User.create(userData.user)
			const authData = { ...userData.auth, userId: newUser.id }
			createdOwnerUsers.push(await Auth.create(authData))
		}

		return createdOwnerUsers
	},

	async down(queryInterface, Sequelize) {
		return Auth.destroy({
			where: {
				email: { [Sequelize.Op.like]: "owner%" },
			},
		})
	},
}

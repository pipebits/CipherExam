const express = require('express');
const router = express.Router()

const auth = require('../middlewares/auth')
const needPermissions = require('../middlewares/needPermissions')

const userController = require('../controllers/userController')

router.post("/", [auth.required, needPermissions(["CipherExam.users.create", "CipherExam.users", "CipherExam"])], userController.create)

router.get("/me", [auth.required, needPermissions(["CipherExam.users.getOwn", "CipherExam.users", "CipherExam"])], userController.getOwn)

router.delete("/me", [auth.required, needPermissions(["CipherExam.users.deleteOwn", "CipherExam.users", "CipherExam"])], userController.deleteOwn)

router.get("/", [auth.required, needPermissions(["CipherExam.users.get", "CipherExam.users", "CipherExam"])], userController.get)

router.delete("/:uid", [auth.required, needPermissions(["CipherExam.users.delete", "CipherExam.users", "CipherExam"])], userController.delete)

router.post("/login", userController.login)

router.post("/logout", userController.logout)

module.exports = router;
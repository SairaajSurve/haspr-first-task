const express = require('express')
const { UserSignUp, GetUserData, UserLogin, EditUserData, DeleteUserData } = require('../controllers/UserController')

const router = express.Router();

// router.use()

router.route('/signup').post(UserSignUp)
router.route('/login').post(UserLogin)
router.route('/data').get(GetUserData).patch(EditUserData).delete(DeleteUserData)


module.exports.UserRouter = router
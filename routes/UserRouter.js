const express = require('express')
const { UserSignUp, GetUserData, UserLogin, EditUserData, DeleteUserData } = require('../controllers/UserController')

const { Authenticate } = require('../middlewares/Authentication')

const router = express.Router();

router.route('/signup').post(UserSignUp)
router.route('/login').post(UserLogin)

router.use(Authenticate)

router.route('/data').get(GetUserData).patch(EditUserData).delete(DeleteUserData)


module.exports.UserRouter = router
const express = require('express')
const { AdminSignUp, AdminLogin, GetUserData, DeleteUserData } = require('../controllers/AdminController')

const { Authenticate } = require('../middlewares/Authentication')

const router = express.Router();

router.route('/signup').post(AdminSignUp)
router.route('/login').post(AdminLogin)

router.use(Authenticate)

router.route('/data').get(GetUserData).delete(DeleteUserData)


module.exports.AdminRouter = router
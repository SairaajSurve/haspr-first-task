const express = require('express')
const { CreateUser } = require('../controllers/UserController')

const router = express.Router();

router.route('/').get().post(CreateUser).patch()


module.exports.UserRouter = router
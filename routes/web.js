import express from 'express'
import userController from '../controllers/userController.js'
import checkAuthUser from '../middlewares/auth-middleware.js'

const route = express.Router()

route.use('/changepassword', checkAuthUser)
route.use('/getuserdata', checkAuthUser)

route.get('/', userController.getAllUsers)
route.post('/userregistration', userController.userRegistration)
route.post('/userlogin', userController.userLogin)
route.post('/sendpasswordresetemail', userController.sendPasswordResetEmail)
route.post('/resetuserpassword/:id/:token', userController.resetUserPassword)

route.post('/changepassword', userController.changePassword)
route.get('/getuserdata', userController.getUserData)


export default route
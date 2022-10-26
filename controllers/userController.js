import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'

class userController {
    static getAllUsers = async (req, res) => {
        try {
            const result = await userModel.find()
            console.log(result)
            res.send({"status":"success"})
        } catch (error) {
            console.log(error)
        }
    }

    static userRegistration = async (req, res) => {
        try {
            const { name, email, password, cpassword, tc } = req.body
            const userExist = await userModel.findOne({email:email})
            if(!userExist){
                if(name && email && password && cpassword && tc){
                    if(password === cpassword){
                        const salt = await bcrypt.genSalt(10)
                        const hashpassword = await bcrypt.hash(password, salt)
                        const newUser = new userModel({
                            name:name,
                            email:email,
                            password:hashpassword,
                            tc:tc
                        })
                        const savedUser = await newUser.save()
                        const token = jwt.sign({userID:savedUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
                        res.send({"status":"success", "message":"user registered", "token": token})
                    } else {
                        res.send({"status":"failed", "message":"password and confirm password does not match"})
                    }
                } else {
                    res.send({"status":"failed", "message":"all feilds required"})
                }
            }else {
                res.send({"status":"failed", "message":"user already exists"})
            }
        } catch (error) {
            console.log(error)
            res.send({"status":"failed", "message":"unable to register"})
        }
    }

    static userLogin = async (req, res) => {
        try {
            const {email, password} = req.body
            if (email && password) {
                const userExist = await userModel.findOne({email:email})
                if (userExist) {
                const comppassword = await bcrypt.compare(password, userExist.password)
                    if (userExist.email == email && comppassword) {
                        const token = jwt.sign({userID:userExist._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
                        res.send({"status":"success", "message":"login successfull", "token":token})
                    } else {
                        res.send({"status":"failed", "message":"wrong email or password"})
                    }
                } else {
                    res.send({"status":"failed", "message":"user does not registered"})
                }
            } else {
                res.send({"status":"failed", "message":"all feilds required"})
            }
        } catch (error) {
            console.log(error)
            res.send({"status":"failed", "message":"unable to login"})
        }
    }

    static changePassword = async (req, res) => {
        try {
            const {newpassword, cnewpassword} = req.body
            if (newpassword && cnewpassword) {
                if (newpassword === cnewpassword) {
                    const salt = await bcrypt.genSalt(10)
                    const newhashpassword = await bcrypt.hash(newpassword, salt)
                    await userModel.findByIdAndUpdate(req.user._id, {$set:{password:newhashpassword}})
                    res.send({"status":"succcess", "message":"password change"})
                } else {
                    res.send({"status":"failed", "message":"password and confirm password does not match"})
                }
            } else {
                res.send({"status":"failed", "message":"all feilds are required"})
            }
        } catch (error) {
            res.send({"status":"failed", "message":"unable to change password"})
        }
    }

    static getUserData = async (req, res) => {
        res.send({"user":req.user})
    }

    static sendPasswordResetEmail = async (req, res) => {
        try {
            const {email} = req.body
            if (email) {
                const user = await userModel.findOne({email:email})
                if (user) {
                    const new_secret = user._id + process.env.JWT_SECRET_KEY
                    const token = jwt.sign({userID: user._id}, new_secret, {expiresIn:'15m'})
                    const link = user._id + new_secret
                    console.log(`http://127.0.0.0:3000/api/user/reset/${user._id}/${token}`)
                    // let info = await transporter.sendMail({
                    //   from: process.env.EMAIL_FROM,
                    //   to: user.email,
                    //   subject: 'Test Email - Password Reset Link',
                    //   html: `<a href=${link}>click here</a> to reset your password`
                    // })
                    res.send({"status":"success", "message":"email sent successfully"})
                } else {
                res.send({"status":"failed", "message":"user not registered"})
                }
            } else {
                res.send({"status":"failed", "message":"all feilds are required"})
            }
        } catch (error) {
            console.log(error)
            res.send({"status":"failed", "message":"cannot sent email"})

        }
    }

    static resetUserPassword = async (req, res) => {
        const {newpassword, cnewpassword} = req.body
        const {id, token} = req.params
        const user = await userModel.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(token, new_secret)
            if (newpassword && cnewpassword) {
                if (newpassword === cnewpassword) {
                    const salt = await bcrypt.genSalt(10)
                    const newhashpassword = await bcrypt.hash(newpassword, salt)
                    await userModel.findByIdAndUpdate(user._id, {$set:{password:newhashpassword}})
                    res.send({"status":"succcess", "message":"password change"})
                } else {
                    res.send({"status":"failed", "message":"password and confirm password does not match"})
                }
            } else {
                res.send({"status":"failed", "message":"all feilds are required"})
            }
        } catch (error) {
            res.send({"status":"failed", "message":"invalid token"})
        }
    }
}

export default userController
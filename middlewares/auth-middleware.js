import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const checkAuthUser = async (req,res, next) => {
    try {
        let token
        const {authorization} = req.headers
        if (authorization && authorization.startsWith('Bearer')) {
            token = authorization.split(' ')[1]
            const {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = await userModel.findById(userID).select('-password')
            next()
        } else {
            res.send({"status":"failed", "message":"not a authorized user"})
        }
    } catch (error) {
        console.log(error)
        res.send({"status":"failed", "message":"can't authorize user"})
    }
}

export default checkAuthUser
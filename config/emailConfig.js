import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    // from dotenv files only dummy email/host/port are coming
    // this will not work
    // written here just for mentioning purpose
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Admin Gmail ID
      pass: process.env.EMAIL_PASS, // Admin Gmail Password
    },
  })
  
  export default transporter
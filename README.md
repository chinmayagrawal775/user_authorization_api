# API that performs Operations like SingUP, SignIN, Change Password, Reset Password on the basis of Authorization.

This is API where you can interact with your account. And each user will get a `bearer token` whenever he/she SingUp or SignIn to the application.

# Features of API
- New User Registration, & get a token.
- LogIn of Existing User, and get a new token.
- Change password of logined user, check if user is authorised or not before changing password.
- Reset password, if user completely forget his paddword.
- Send the email to registered Email-ID after user select Reset Password.

# Tech Stack
- `Express JS` for Creating Bakend.
- `MongoDB` for Data Storage.
- `bcrypt` for hashing password.
- `nodemailer` for sending password reset e-mail.
- `jsonwebtoken` for generating web token when user register or login.
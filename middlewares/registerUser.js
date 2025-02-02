const User = require('../models/user')
const {hashPassword} = require('../utils/hashpassword')
const {ValidateNewUser} = require('../utils/validateUser')
const generateToken = require('../utils/generateVerificationToken')
const verifyTemplate = require('../EmailTemplate/verifyEmailTemplate')
const {sendVerifyEmail} = require('../utils/email')

exports.register = async (req, res) => {
    try {

        const { email, username, password } = req.body;
        const lowecase_username = username.toLowerCase();


        const userExists = await ValidateNewUser(email, lowecase_username);
        if (userExists) {
            return res.status(409).json({ error: 'Email or username already exists.' });
        }

        const hashedPassword = await hashPassword(password);
        const verificationToken = generateToken();

        const newUser = new User({
            "username": lowecase_username,
            "email": email,
            "password": hashedPassword,
            "verificationToken":verificationToken
        })
        await newUser.save();

        const verificationLink = `https://teamhubbackend.onrender.com/v1/api/mail/verify-email?token=${verificationToken}`

        const htmlcontent = await verifyTemplate.verifyEmailTemplate(username,verificationLink);
        
        await sendVerifyEmail(email, 'Email Verifcation', htmlcontent)

        res.status(201).json({message:'Registration Done Please verify your Email'});

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }

}

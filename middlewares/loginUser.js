const {ValidateExistingUser} = require('../utils/validateUser')
const { validatePassword } = require('../utils/hashpassword')
const {generateJWT} = require('../utils/generateJWT')

exports.loginUser = async (req, res) => {
    try {
        const { user, password } = req.body
        const userExists = await ValidateExistingUser(user);
        if (!userExists) {
            return res.status(404).json({ error: 'Invalid Credentials' });
        }
        const checkPassword = await validatePassword(password, userExists.password);

        if (!checkPassword) return res.status(401).json({ error: 'Invalid Credentials' })

        const data = {
            userId: userExists._id,
            name: userExists.username,
            email: userExists.email
        };

        const jwtToken = await generateJWT(userExists);

         res.cookie("authToken", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
          });


        return res.status(200).json({message:"Login succesfull",data:data});

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
     
    }
}

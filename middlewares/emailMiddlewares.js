const User = require('../models/user')
const {sendEmail} = require('../utils/email')
const multer = require('multer')
const fs = require('fs')

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
});

exports.mail = [upload.single('file'),
async (req, res) => {
    try {
        const {file} = req
        const { receiverMail, subject, content } = req.body

        await sendEmail(receiverMail, subject, content, file)

        if (file) {
            fs.unlinkSync(file.path);
        }

        return res.status(200).json({ message: 'Mail Sent Successfully!' });

    } catch (error) {
        return res.status(500).json({ message: 'Failed to send Mail', error: error.message });
    }
}
]

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
      const user = await User.findOne({ verificationToken:token });

      if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
  
      res.redirect(process.env.URL_REDIRECT)
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
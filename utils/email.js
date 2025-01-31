const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

const sendEmail = async(to,subject,content,file)=>{
    try {
        const mailContent = {
            from:process.env.EMAIL_USER,
            to:to,
            subject:subject,
            text:content,
            attachments:file ? [
                {
                    filename: file.originalname,
                    path: file.path,
                }
            ] : [], 
        } 

        await transporter.sendMail(mailContent);
    } catch (error) {
        console.log('something wrong happened',error);
    }
}


const sendVerifyEmail = async(to,subject,htmlContent)=>{
    try {
        const mailContent = {
            from:process.env.EMAIL_USER,
            to:to,
            subject:subject,
            html:htmlContent, 
        } 

        await transporter.sendMail(mailContent);
    } catch (error) {
        console.log('something wrong happened',error);
    }
}

module.exports = {sendEmail,sendVerifyEmail}
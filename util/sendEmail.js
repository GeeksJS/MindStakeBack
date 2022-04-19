const nodemailer = require("nodemailer");

const sendEmail = async ({email, subject, html}) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.HOST,
            // service: process.env.SERVICE,
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 2525,
            auth: {
                user: "noreply.mindstake@gmail.com",
                pass: "Mindstake2022",
            },
        });
        // console.log(email)

        await transporter.sendMail({
            from: "noreply.mindstake@gmail.com", 
            to: email,
            subject: subject,
            html: html, 
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;
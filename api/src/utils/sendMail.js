import nodemailer from 'nodemailer'

const transporterConfig = {
    service: "gmail",
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
}


const sendMail = async (mailMessage) => {
    const transporter = nodemailer.createTransport(transporterConfig)
    await transporter.sendMail(mailMessage)
}


export default sendMail;

import nodemailer from "nodemailer";
import "dotenv/config";

const { EMAIL, PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, 
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = data => {
    const email = {...data, from: EMAIL};
    return transport.sendMail(email);
}

export default sendEmail;
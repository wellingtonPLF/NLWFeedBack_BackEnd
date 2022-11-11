import { MailAdapter, SendMailData } from "../mailFeature";
import nodemailer from 'nodemailer'

export class NodemailderMailAdapter implements MailAdapter {
    async sendMail ({subject, body}: SendMailData) {
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "20272a46f95bdf",
              pass: "20d8d86cddd0dc"
            }
        });

        await transport.sendMail({
            from: 'Algusto DelaCruz <powertk82@gmail.com>',
            to: 'WellingtonPLF <wellplf@gmail.com>',
            subject,
            html: body
         })
    }
}
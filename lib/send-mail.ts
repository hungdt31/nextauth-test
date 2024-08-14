import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface EmailProps {
  token: string,
  email: string
}
interface SendMailProps {
  email: string, 
  subject: string, 
  text?: string, 
  html: string
}
class SendEmail {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      secure: false, // Đặt thành false nếu không sử dụng SSL/TLS
      service: "Gmail",
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
  }

  async sendEmail({
    email,
    text,
    subject,
    html
  } : SendMailProps) {
    try {
      await this.transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject,
        text,
        html
      });

      console.log("Email sent successfully");
    } catch (error) {
      console.log(error, "Email not sent");
    }
  }
}

// Sử dụng lớp SendEmail
const emailSender = new SendEmail();
export const SendEmailConfirmation = async ({
  token,
  email
} : EmailProps) => {
  await emailSender.sendEmail({
    email,
    html: `Click <a href="${process.env.DOMAIN}/auth/email-confirmation?token=${token}">here</a> to verify your email. Expire in 10 minutes.`,
    subject: "Email verification",
  });
}

export const SendEmailResetPassword = async ({
  token,
  email
} : EmailProps) => {
  await emailSender.sendEmail({
    email,
    html: `Click <a href="${process.env.DOMAIN}/auth/new-password?token=${token}">here</a> to change password. Expire in 10 minutes.`,
    subject: "Change password",
  });
}


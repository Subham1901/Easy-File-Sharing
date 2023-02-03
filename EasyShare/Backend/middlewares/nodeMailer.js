import nodemailer from "nodemailer";

export const sendMail = async ({ from, to, subject, text, html }) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let info = transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
  return info;
};

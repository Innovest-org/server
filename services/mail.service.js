const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendActivationMail(to , username) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: `Account approval` ,
      text: `Your account with username ${username} and email ${to} has been approved
      and this is your password 
      Note!! you have to change it as soon as possible` ,
    //   html: `
    //             <div>
    //                 <h1>Your account has been approved</h1>
    //                 <a href="${link}">${link}</a>
    //             </div>
    //         `,
    });
  }

  async sendRejectionMail(to , username) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: `Account rejection` ,
      text: `Your account with username ${username} and email ${to} has been rejected due to
      some reasons please contact the admin for more information or try to register again with valid information
      and valid national id and valid id photos` ,
    //   html: `
    //             <div>
    //                 <h1>Your account has been approved</h1>
    //                 <a href="${link}">${link}</a>
    //             </div>
    //         `,
    });
  }

  async sendResetPasswordMail(to , randomPassword) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: "Reset Password",
      text: `Your new password is ${randomPassword}`,
    });
  }
}

module.exports = new MailService();
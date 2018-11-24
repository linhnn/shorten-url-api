const nodemailer = require('nodemailer');
const assert = require('assert');

const adapter = {
  async gmail({
    from, to, subject, html,
  }) {
    assert(from, 'EmailService - "from" is required');
    assert(to, 'EmailService - "to" is required');
    assert(subject, 'EmailService - "subject" is required');
    assert(html, 'EmailService - "html" is required');

    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.gmail_username,
          pass: process.env.gmail_password,
        },
      });
      const mailOptions = {
        from,
        to,
        subject,
        html,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return reject(error);
        return resolve(info);
      });
    });
  },
};


module.exports = adapter.gmail;

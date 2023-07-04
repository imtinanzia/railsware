// const { MailtrapClient } = require("mailtrap");
// const dotenv = require("dotenv");

// dotenv.config();

// const client = new MailtrapClient({ token: process.env.API_TOKEN });

// const sendEmail = async (req, res) => {
//   const { sender, recipient, subject, text, html, attachments } = req.body;
//   const { name: senderName, email: senderEmail } = sender;
//   const { name: recipientName, email: recipientEmail } = recipient;

//   const data = {
//     from: {
//       name: senderName,
//       email: senderEmail,
//     },
//     to: [
//       {
//         name: recipientName,
//         email: recipientEmail,
//       },
//     ],
//     subject,
//     text,
//     html,
//     attachments,
//   };
//   try {
//     const response = await client.send(data);
//     return response;
//   } catch (error) {
//     throw new Error(`Failed to send email: ${error.message}`);
//   }
// };

// module.exports = { sendEmail };
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Mailtrap',
  auth: {
    user: 'ce6ee2d6fd3352',
    pass: '22956066f8a28b',
  },
});

const sendEmail = async (req, res) => {
  const { sender, recipient, subject, text, html, attachments } = req.body;
  const { name: senderName, email: senderEmail } = sender;
  const { name: recipientName, email: recipientEmail } = recipient;
  console.log(transporter, 'data');
  const mailOptions = {
    from: `"${senderName}" <${senderEmail}>`,
    to: `"${recipientName}" <${recipientEmail}>`,
    subject,
    text,
    html,
    attachments,
  };
  console.log('🚀 ~ ~ mailOptions:', mailOptions);

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log('in try');
    return res.status(200).json({ message: 'Success!', data: response });
  } catch (error) {
    console.log('in catch', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = { sendEmail, transporter };

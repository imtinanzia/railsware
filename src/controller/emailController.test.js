const { sendEmail } = require('./emailController'); // Update with your actual code file name
const nodemailer = require('nodemailer');

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ mockResponse: 'Email sent' }),
  }),
}));

describe('sendEmail function', () => {
  test('sends an email successfully', async () => {
    const req = {
      body: {
        sender: {
          name: 'Sender Name',
          email: 'sender@example.com',
        },
        recipient: {
          name: 'Recipient Name',
          email: 'recipient@example.com',
        },
        subject: 'Test Email',
        text: 'This is a test email.',
        html: '<p>This is a test email.</p>',
        attachments: [],
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await sendEmail(req, res);

    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: '"Sender Name" <sender@example.com>',
      to: '"Recipient Name" <recipient@example.com>',
      subject: 'Test Email',
      text: 'This is a test email.',
      html: '<p>This is a test email.</p>',
      attachments: [],
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Success!',
      data: { mockResponse: 'Email sent' },
    });
  });
});

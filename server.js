const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-emails', (req, res) => {
  const { email, phone, attendance, side, guests } = req.body;

  const msg1 = {
    to: 'hasanahmedhaf@gmail.com',
    from: 'hasanahmedhaf@gmail.com',
    subject: 'Wedding RSVP',
    text: `Email: ${email}\nPhone: ${phone}\nAttendance: ${attendance}\nSide: ${side}\nGuests: ${guests}`,
    html: `<strong>Email:</strong> ${email}<br>
           <strong>Phone:</strong> ${phone}<br>
           <strong>Attendance:</strong> ${attendance}<br>
           <strong>Side:</strong> ${side}<br>
           <strong>Guests:</strong> ${guests}`,
  };

  const msg2 = {
    to: email,
    from: 'hasanahmedhaf@gmail.com',
    subject: 'Wedding RSVP Confirmation',
    text: `Thank you for your response!\nHere are the details you submitted:\nEmail: ${email}\nPhone: ${phone}\nAttendance: ${attendance}\nSide: ${side}\nGuests: ${guests}`,
    html: `<p>Thank you for your response!</p>
           <p>Here are the details you submitted:</p>
           <p><strong>Email:</strong> ${email}<br>
           <strong>Phone:</strong> ${phone}<br>
           <strong>Attendance:</strong> ${attendance}<br>
           <strong>Side:</strong> ${side}<br>
           <strong>Guests:</strong> ${guests}</p>`,
  };

  Promise.all([sgMail.send(msg1), sgMail.send(msg2)])
    .then(() => {
      res.status(200).send('Confirmation email sent');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending emails');
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

// Mailgun credentials
let API_KEY = 'ed7f841797ee969a6f941ab6c04a4deb-2b755df8-44f641e6';
let DOMAIN = 'sandbox9f4e35851d244dafb3da9ad4766bf91f.mailgun.org';
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

// Create an express app
const app = express();

// Middleware to serve static files like CSS and JS
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to send the welcome email
const sendMail = function (receiver_email) {
    const sender_email = 'dev@deakin.com'; // From your application
    const email_subject = 'Welcome to DEV@Deakin';
    const email_body = `Hi there,

Thank you for subscribing to the DEV@Deakin platform. We're excited to have you on board!

Best regards,
The DEV@Deakin Team`;

    const data = {
        from: sender_email,
        to: receiver_email,
        subject: email_subject,
        text: email_body
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.log("Error sending email:", error);
        } else {
            console.log("Email sent successfully:", body);
        }
    });
};

// Route to handle form submission
app.post('/signup', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Send the welcome email
    sendMail(email);

    // Respond with success
    res.status(200).json({ message: `Welcome email sent to ${email}` });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

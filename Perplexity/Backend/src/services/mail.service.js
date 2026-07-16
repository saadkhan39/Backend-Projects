import nodemailer from "nodemailer" 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export async function sendEmail({to, subject, text, html}){
    
    const mailOptions = {
        from :process.env.GOOGLE_USER,
        to,
        subject,
        text,
        html
    }

     const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
}
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})
let mailOptions = {
    from: `José Restrepo <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'Mensaje de prueba',
    text: 'Mensaje de prueba enviado desde Node.js usando Nodemailer.',
    html : '<h1>Hola</h1><p>Mensaje de prueba enviado desde Node.js usando Nodemailer.</p>'
}

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error al enviar el correo: ' + error);
    }
    console.log('Correo enviado: ' + info.response);
});
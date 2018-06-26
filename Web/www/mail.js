'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

const smtpTransport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "temperaturerecordtoulouse@gmail.com",
		pass: "coldatoms"
	}
});

// setup email data with unicode symbols
const mailOptions = {
	// sender address
	from: '"la manip 👻" <temperaturerecordtoulouse@gmail.com>',
	// list of receivers
	to: 'gabriel.chatelain@googlemail.com , arnal@irsamc.ups-tlse.fr, brunaud@irsamc.ups-tlse.fr',
	// Subject line
	subject: 'Hello ✔',
	// plain text body
	text: "Il fait un peu chaud ... À l'aide",
	// html body
	html: "<b>Il fait un peu chaud ... À l'aide</b>"
};

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response) {
	if (error) {
		console.log("Erreur lors de l'envoie du mail!");
		console.log(error);
	} else {
		console.log("Mail envoyé avec succès!");
	}
	smtpTransport.close();
});

/////////////
// exports //
/////////////
module.export.smtpTransport = smtpTransport;
module.export.mailOptions = mailOptions;
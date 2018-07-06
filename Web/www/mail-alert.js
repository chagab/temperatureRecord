'use strict';
const nodemailer = require('nodemailer');
const {
	SERVICE,
	USER,
	PASS,
	MAIL_LIST
} = require('./parameters').mail_parameters;

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

module.exports.smtpTransport = nodemailer.createTransport({
	service: SERVICE,
	auth: {
		user: USER,
		pass: PASS
	}
});

// function that setup email data with unicode symbols
module.exports.mailOptions = function mailOptions() {
	let listToAlert = '';
	for (let people of MAIL_LIST) {
		listToAlert += `${people}, `;
	}
	return {
		// sender address
		from: `"la manip 👻" <${USER}>`,
		// list of receivers
		to: listToAlert,
		// Subject line
		subject: 'Hello ✔',
		// plain text body
		text: "Il fait un peu chaud ... À l'aide",
		// html body
		html: "<b>Il fait un peu chaud ... À l'aide</b>"
	};
}

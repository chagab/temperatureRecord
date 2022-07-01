'use strict';
import nodemailer from "nodemailer";
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

let listToAlert = '';
for (let people of process.env.MAIL_LIST) {
	listToAlert += `${people}, `;
}

export const smtpTransport = nodemailer.createTransport({
	service: process.env.SERVICE,
	auth: {
		user: process.env.USER,
		pass: process.env.PASS
	}
});
export const mailOptions =  {
	from: `"la manip 👻" <${process.env.USER}>`,
	to: listToAlert,
	subject: 'Hello ✔',
	text: "Il fait un peu chaud... À l'aide",
	html: "<b>Il fait un peu chaud... À l'aide</b>"
};

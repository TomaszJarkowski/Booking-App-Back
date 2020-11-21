const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.API_KEY_SENDGRID);

const message = {};

message.from = process.env.EMAIL_FROM;

exports.message = message;

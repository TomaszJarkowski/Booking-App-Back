const sgMail = require("@sendgrid/mail");
const sgConfig = require("../config/sendgrid");

exports.send = (email, password) => {
  Object.assign(sgConfig.message, {
    to: email,
    subject: "BOOKING",
    html: `<h2>${password}</h2>`,
  });

  (async () => {
    try {
      await sgMail.send(sgConfig.message);
      console.log("Everything went well");
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
};

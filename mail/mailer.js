const sgMail = require("@sendgrid/mail");
const sgConfig = require("../config/sendgrid");

exports.send = (email, password) => {
  Object.assign(sgConfig.message, {
    to: email,
    subject: "Booking-App",
    html: `
    <div style:"padding: 20px;">
          <h2 style="color:#333; text-align: center; padding-bottom: 20px;">Welcome in Booking-App!</h2>
           <h3 style="text-align: center;">Your new password is: <h3>
           <h3 style="text-align: center; color: #333; border-bottom: 2px solid black;">${password}</h3>
           <p style="text-align: center; font-weight: bold;">After logging in, please change your password to the one you want!</p>
           <a style="display: block; margin: 0 auto; border-radius: 10px; font-weight: bold;  background-color: #FEE996; padding: 10px 30px; color: #333; text-decoration: none; text-align: center;" href="https://booking-app-front.herokuapp.com/">Bookin-App</a>
    </div>
    `,
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

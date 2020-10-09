const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/userRouter");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// set up routes
app.use("/users", userRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`The server has started on port ${PORT}`);
});

// set up mongoose

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

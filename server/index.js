const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const addRouter = require("./routes/addRouter");
const searchRouter = require("./routes/searchRouter");
const PASSWORD = `cyberwar123`;

const PORT = process.env.PORT || 5000;
const DB_URL = `mongodb+srv://admin:${PASSWORD}@cluster0.clz1g.mongodb.net/admitkardDB?retryWrites=true&w=majority`;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Establised!!");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(cors());
app.use("/add", addRouter);
app.use("/search", searchRouter);
app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Server started at :", PORT);
  }
});

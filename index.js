const express = require("express");
const mongoose = require('mongoose');

require('dotenv').config()

const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;

const app = express();

const uri = process.env.DB_URI;
mongoose.set("strictQuery", false);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));

//middleware for cookies
app.use(cookieParser());

app.use('/user', require('./routes/user'));
app.use('/room', require('./routes/room'));
app.use('/mark', require('./routes/mark'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
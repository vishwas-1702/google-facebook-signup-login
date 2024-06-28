var express = require('express');
var app = express();
require('dotenv').config();
const googleRoute = require('./google/googleRoute')
const facebookRoute = require('./facebook/fbRoute')
const signupRoute = require('./signup/signupRoute')
const {connectToMongo} = require('./db/db')

// app.use('/signup',googleRoute)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',facebookRoute)
app.use('/',googleRoute)
app.use('/auth',signupRoute)
const PORT = process.env.PORT
app.get('/test', (req, res) => {
    res.send('Logged in successfully');
});

app.get('/home', (req, res) => {
  res.send('Logged in successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    connectToMongo();
  });


module.exports = app

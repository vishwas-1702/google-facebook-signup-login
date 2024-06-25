var express = require('express');
var app = express();
require('dotenv').config();
const googleRoute = require('./google/googleRoute')
const connectMongodb = require('./db/db')

// app.use('/signup',googleRoute)
app.use('/',googleRoute)
const PORT = process.env.PORT
app.get('/test', (req, res) => {
    res.send('Logged in successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
//     connectMongodb();
  });


module.exports = app

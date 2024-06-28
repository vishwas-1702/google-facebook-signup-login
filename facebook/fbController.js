require('dotenv').config();
const axios = require('axios');


const facebookSignup = async (req,res) => {
    // console.log(process.env.FACEBOOK_CLIENT_ID)
    const loginUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_CALLBACK_URL}`;
    res.redirect(loginUrl);
  };
  
  const facebookCallback = async (req, res) => {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send('Code not found');
    }
    const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_SECRET_KEY}&code=${code}&redirect_uri=${process.env.FACEBOOK_CALLBACK_URL}`;
  
    try {
      const response = await axios.get(tokenUrl);
      const accessToken = response.data.access_token;
  
      const userInfoUrl = `https://graph.facebook.com/v18.0/me?fields=id,name,email&access_token=${accessToken}`;
      const userInfoResponse = await axios.get(userInfoUrl);
      console.log(userInfoResponse.data)
      res.redirect('/home')
    } catch (error) {
      console.error('Error while logging in with facebook', error);
      res.status(500).send('Internal Server Error');
    }
  }


  module.exports = {facebookSignup,facebookCallback}
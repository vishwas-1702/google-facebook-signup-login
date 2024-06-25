require('dotenv').config();
const axios = require('axios')


const googleSignup = async (req, res) => {
    const clientID = process.env.CLIENT_ID
    const redirectURI = process.env.REDIRECT_URI 
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=profile email`;
    

    console.log(url); // Log to ensure the URL is correct
    res.redirect(url);
};


// Callback URL for handling the Google Login response
const googleAuthCallback = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) throw new Error('Authorization code not found');

        // Exchange code for tokens
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        const { access_token } = tokenResponse.data;

        // Fetch the user's profile information
        const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        console.log('User Data:', profileResponse.data);
        res.redirect('/test'); // Adjust to the correct route

    } catch (error) {
        console.error( error);
    }
};


module.exports = {googleSignup,googleAuthCallback}


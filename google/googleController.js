require('dotenv').config();
const axios = require('axios')
const user = require('../models/user')
const { promisify } = require('util');
const { setDataInRedis } = require('../middleware/protectedRoute')
const {redis} = require('../db/db')
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");


const googleSignup = async (req, res) => {
    const clientID = process.env.CLIENT_ID
    const redirectURI = process.env.REDIRECT_URI 
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=profile email`;
    

    // console.log(url);
    res.redirect(url);
};


// Callback URL 
const googleAuthCallback = async (req, res) => {
    try {
        let User 
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

        const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        // console.log('User Data:', profileResponse.data);
        const userData = profileResponse.data
        const existingUser = await user.findOne({ Email: userData.email });
        const incrUseCount = await redis.send_command('JSON.NUMINCRBY', ['counters', 'users', 1])
        const userKey = `usr:${incrUseCount}`
        if (!existingUser) {
            User = await user.create({
                Name: userData.name,
                Email: userData.email,
                isProvider: 'google',
                userId:userKey
            });
            const data = {name:userData.name,email:userData.email,isProvider:"google"}
            // console.log(data)
            await setDataInRedis(userKey,data)
        }

        const tokenPayload = {
            user: {
                userId: User.userId,
                email: userData.email
            }
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            token,
            user: {
                name: userData.name,
                email: userData.email,
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server error!"
        });
    }
};




const getUser = async(req,res)=>{
    try {
        let {userId}=req
        console.log(userId)
        const getUser = await user.findOne({userId}).select("-Password")
        if(!getUser) return res.status(404).json({message:"User not found"})
    res.status(200).json(getUser)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server error!"
        });
    }
}



module.exports = {googleSignup,googleAuthCallback,getUser}


const { redis } = require('../db/db')
const user = require('../models/user')
const { setDataInRedis } = require('../middleware/protectedRoute')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { promisify } = require('util');


const regUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        console.log(req.body)
        const isExist = await user.findOne({ email })
        if (isExist) return res.status(400).json({ message: "Already exist please login" })
        const salt = await bcrypt.genSalt(10);
        const genPass = await bcrypt.hash(password, salt);
        const incrUseCount = await redis.send_command('JSON.NUMINCRBY', ['counters', 'users', 1])
        const userKey = `usr:${incrUseCount}`
        const createUser = await user.create({
            userId: userKey,
            Name: name,
            Username: username,
            Email: email,
            Password: genPass,
            isProvider: "signup"
        });
        const data = { name:name, email:email, password: genPass, isProvider: "signup" }
        await setDataInRedis(userKey, data)
        const token = jwt.sign({ data }, process.env.JWT_SECRET);
        res.status(201).json({
            success: true,
            user,
            token
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server error!"
        });
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        const getUser = await user.findOne({ Email: email });
        console.log(getUser)
      if (!getUser) {
          return res.status(400).json({
              success: false,
              message: "Please try to Signin with correct creditentials",
          });
      }
      const isMatch = await bcrypt.compare(password, getUser.Password);
      if (!isMatch) {
          return res.status(400).json({
              success: false,
              message: "Please try to login with correct creditentials",
          });
      }
      const data = {
        user: {
            id: getUser.userId
        }
    }
    console.log(data)
      const token = jwt.sign(data, process.env.JWT_SECRET);
      const obj = getUser.toObject();
      delete obj.Password;

      res.status(201).json({
          success: true,
          getUser: obj,
          token,
      })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server error!"
        });
    }
}

const getUser = async(req,res)=>{
    try {
        const {userId}=req
        // console.log(userId)
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
module.exports = { regUser , login,getUser}
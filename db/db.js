const mongoose = require("mongoose");
const Redis = require("ioredis");
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        mongoose.connect(`${MONGO_URI}`)
        console.log("MongoDB is connected");
    } catch (error) {
        console.log(error);
        console.log("MongoDB is not connected");
    }
}


const redisOptions = {
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT, 
    password: "gNJ9f3AVbLy8ssafpPf9lqBoyq1ei1Zr",
  };
  const redis = new Redis(redisOptions);

  redis.on('connect', () => {
    console.log('Connected to Redis server');
    checkConnectionStatus();
  });

  redis.on('error', (err) => {
    console.error('Redis Error:', err);
  });
  
function checkConnectionStatus() {
    redis.ping((err, reply) => {
      if (err) {
        console.error('Error pinging Redis server:', err);
      } else {
        console.log('Redis server is running:', reply === 'PONG');
      }
    })
  
  }



  module.exports = { connectToMongo, redis };


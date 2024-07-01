# Server configuration
PORT=1818

# MongoDB URI
MONGO_URI=mongodb://your_mongo_uri

# JWT Secret for token signing
JWT_SECRET=your_secret_key

# Redis configuration
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port

# Google OAuth configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:1818/v1/google/callback

# Facebook OAuth configuration
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_SECRET_KEY=your_facebook_secret_key
FACEBOOK_CALLBACK_URL=http://localhost:1818/v1/facebook/callback


## FEATURES ##

• TECH STACK :- Nodejs , MongoDB , Redis
• Authentication :- JWT
• Signup & login with google facebook and user signup
• Created a middleware to get user by exchanging token

# FOR GOOGLE
OPEN BROWSER and GO to This Link it will redirect your to google login/signup page
localhost:1818/v1/google/signup
after this this will go to callbackurl which you have to define in your Google OAuth url and your redirect uri
Then after success this will navigate to /test route which say login succesfully
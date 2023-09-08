# Threads-Clone-Backend-NodeJs
`A Social Media Rest API built with Node.JS , Express and Mongo Db`

## Features:
- Make posts, like them , add comments and replies
- User login, sign up, and authentication
- See likes for posts, comments, replies
- Follow, unfollow
- Customize your user profile
- Image uploads
- See feed post of users you followed them

## Run
To run the application, follow these steps:

1. Set up environmental variables:
   Create a file named `.env` at the root of the project and add the following lines to it:
   ```
   MONGO_URI=<your_mongo_uri>
   JWT_SEC =<your_JWT_secret>
   ```
   Replace `<your_mongo_uri>` and `<your_JWT_secret>` with the appropriate values you obtained for your MongoDB Atlas database and JWT secret respectively.

2. Navigate to the "DB" folder:
   Go to the "DB" folder in the project directory, and you'll find files related to your MongoDB database.

3. Fill your MongoDB Atlas database:
   Use the files in the "DB" folder to populate your MongoDB Atlas database with the required data for the application to function correctly.

4. Install dependencies:
   Open a terminal or command prompt in the root of the project directory, and run the following command to install the required dependencies:
   ```
   npm install
   ```

5. Start the application:
   After the installation is complete, run the following command in the terminal to start the application:
   ```
   npm start
   ```

Now the application should be up and running. You can access it through your browser at the specified URL 
```(usually http://localhost:3000)```. 
Make sure your MongoDB Atlas database is properly connected, and you can interact with the application.

## Technology

The application is built with:

- Node.js version 18.17.0 LTS
- MongoDB version 7.4.0
- Express version 4.18.2
- bcrypt  version  5.1.0 
- dotenv version 16.3.1 
- jsonwebtoken version 9.0.1
- mongoose version 7.4.0
- nodemon version 3.0.1
- route version 0.2.5


## Database

All the models can be found in the models directory created using mongoose.

### User Schema:
- name (String, required)
- username (String, required, unique)
- email (String, required, unique)
- password (String, required, minLength: 6)
- profilePic (String, default: "")
- followers (Array of Strings Of Users Ids, default: [])
- following (Array of Strings  Of Users Ids, default: [])
- bio (String, default: "")
### postSchema:
- postedBy (mongoose.Schema.Types.ObjectId, ref: "User", require: true)
- text (String, maxLength: 10000)
- img (String)
- likes (Array of mongoose.Schema.Types.ObjectId, ref: "User", default: [])
- replies (Array)
  - userId (mongoose.Schema.Types.ObjectId, ref: "User", required: true)
  - text (String, required: true)
  - userProfilePic (String)
  - username (String)



## License

[![License](https://img.shields.io/:License-MIT-blue.svg?style=flat-square)](http://badges.mit-license.org)

- MIT License
- Copyright 2023 © - MIT License
- [Ali Nour](https://github.com/alin00r)

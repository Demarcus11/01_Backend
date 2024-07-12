import mongoose from "mongoose";

// Initialize connection to DB via connection string, put it inside a function to have more control of when you want to invoke it
export const connectDB = (url) => {
  return mongoose.connect(url); // returns a promise
};

/*

Why use a .env file?

- If you were to push this code to GitHub or some other code sharing platform, anyone would be able to see your
connection string which has your username and password to the database and they would be able to tamper with
the data inside which is very bad because there could be sensitive information in the DB.

- The .env file keeps this data by not including it in the files that are pushed to the code sharing platform
so it stays local. We add .env to a .gitignore file so git doesn't add it when pushing files.

- The 'dotenv' npm package allows us to use the variables created inside the .env files in other parts of the
application because its not a JS file so you can't export variables inside there.


*/

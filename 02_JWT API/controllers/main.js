/*

- login is a POST request so we'll get the username and password from req.body

- if the username and password exist then create a new JWT

- if not then send back an error response

*/
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  // we could've also used mongoose validation to check if username and password are provided like we did in the task project

  // if username or password isn't provided then throw an error
  if (!username || !password) {
    throw new BadRequestError("Please provide username and password"); // BadRequestError is an instance of CustomAPIError because it inherits from it, so when this error gets passed to the error handler middleware function the first if-block will be true
  }

  // Create a JWT
  const id = Date.now(); // this id is usually provided by the DB such as _id
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "30d" }); // Send a payload (your data) in our case we want to use the id and username because their username and id will be encoded into the token so we know that username and id is for this token (you don't want to include the password because someone can decode it and get both the username and password and gain access to the account), a JWT secret (token signature), and options. this site is a great resource on the structure: https://jwt.io/ click on the debugger tab

  res.status(200).json({ msg: "user created", token });
};

export const dashboard = async (req, res) => {
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data: ${luckyNumber}`,
  });
};

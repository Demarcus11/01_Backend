import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/unauthenticated.js";

// middleware function that checks authentication everytime a request is made
export const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded; // destructure the id and username from the decoded object
    req.user = { id, username }; // set the user property on the request object to the id and username, so we can access the id and username in the dashboard controller
    next(); // go to the next middleware function after its been verified which is dashboard()
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

/*

Instead of copying and pasting this in every controller that needs this, we create middleware for it.

*/

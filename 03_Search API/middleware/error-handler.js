//  Middleware function that runs when we use next(error)
export const errorHandlerMiddleware = async (err, req, res, next) => {
  return res.status(500).json({ msg: err.message });
};

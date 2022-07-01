const jwt = require("jsonwebtoken");
const customError = require("../../utils/customError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization.includes("Bearer ")) {
      const error = customError(401, "Bad request", "Bearer missing");
      next(error);
    }
    const token = authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, process.env.SECRET);
    req.userId = id;

    next();
  } catch {
    const error = customError(401, "Bad request", "Invalid token");
    next(error);
  }
};

module.exports = auth;

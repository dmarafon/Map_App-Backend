require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../database/models/User");
const customError = require("../../utils/customError");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Incorrect email");
    error.statusCode = 403;
    error.customMessage = "Email or password is wrong";
    next(error);
  } else {
    const userData = {
      firstName: user.firstname,
      email: user.email,
      id: user.id,
    };
    const rightPassword = await bcrypt.compare(password, user.password);

    if (!rightPassword) {
      const error = customError(
        400,
        "Incorrect Password",
        "Email or Password is Wrong"
      );
      next(error);

      next(error);
    } else {
      const token = jsonwebtoken.sign(userData, process.env.SECRET);

      res.status(200).json({ token });
    }
  }
};

module.exports = { loginUser };

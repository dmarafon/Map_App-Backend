const User = require("../../database/models/User");
const customError = require("../../utils/customError");
const Location = require("../../database/models/Location");

const getUserLocations = async (req, res, next) => {
  const { userId } = req;

  try {
    const { userid } = await User.findById(userId).populate({
      path: "userid",
      model: Location,
    });

    const count = await User.countDocuments();

    res.status(200).json({
      userid,
      totalLocations: Math.ceil(count),
    });
  } catch {
    const error = customError(
      400,
      "Bad request",
      "Wrong parameters to get Data"
    );
    next(error);
  }
};

module.exports = { getUserLocations };

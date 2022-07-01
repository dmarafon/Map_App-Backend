const User = require("../../database/models/User");
const customError = require("../../utils/customError");
const Location = require("../../database/models/Location");

const getUserLocations = async (req, res, next) => {
  const { userId } = req;

  try {
    const { marks } = await User.findById(userId).populate({
      path: "marks",
      model: Location,
    });

    const count = await User.countDocuments();

    res.status(200).json({
      marks,
      totalLocations: Math.ceil(count + 1),
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

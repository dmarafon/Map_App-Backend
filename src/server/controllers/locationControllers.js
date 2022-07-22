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

const deleteLocations = async (req, res, next) => {
  const { userId } = req;
  const { locationId } = req.params;

  const location = await Location.findByIdAndDelete(locationId);
  if (location) {
    const updatedCollection = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { marks: locationId },
      },
      { new: true }
    );

    if (updatedCollection) {
      res.status(200).json({ deleted_location: location });
    }
  } else {
    const error = customError(404, "Bad request", "Location Not Found");
    next(error);
  }
};

module.exports = { getUserLocations, deleteLocations };

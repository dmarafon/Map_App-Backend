const mockingoose = require("mockingoose");
const User = require("../../../database/models/User");
const model = require("../../../database/models/User");
const { getUserLocations } = require("../locationControllers");

const next = jest.fn();

describe("Given the getUserLocations controller", () => {
  describe("When invoked passing in the query parameters of the request the user id and it's found", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // eslint-disable-next-line no-underscore-dangle
    const _doc = {
      _id: "507f191e810c19729de860ea",
      artworkAuthor: "name",
    };

    test("Then response status will be 200", async () => {
      const expectedStatus = 200;

      const req = {
        userId: "507f191e810c19729de860ea",
      };

      mockingoose(model).toReturn(_doc, "findOne");

      User.countDocuments = jest.fn().mockReturnValue(2);

      await getUserLocations(req, res, next);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatus);
    });
  });
});

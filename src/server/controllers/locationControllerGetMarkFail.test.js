const { getUserLocations } = require("./locationControllers");

jest.mock("../../database/models/User", () => ({
  findby: jest.fn().mockImplementation(() => {
    throw new Error();
  }),
}));

const next = jest.fn();

describe("Given the getUserLocations controller", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe("When invoked and an error ocurrs", () => {
    test("Then next function will be called", async () => {
      const req = {
        body: jest.fn().mockReturnThis(),
      };

      await getUserLocations(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

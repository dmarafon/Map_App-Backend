const Location = require("../../../database/models/Location");
const User = require("../../../database/models/User");
const mockLocations = require("../../../utils/mocks/mockLocations");
const { deleteLocations } = require("../locationControllers");

const next = jest.fn();

describe("Given a deleteLocations controller", () => {
  const expectedStatus = 200;

  const req = {
    body: { userId: 3 },
    params: {
      artworkId: 3,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When invoked with a given artwork id corresponding to an existing art in the database in the body of the request", () => {
    Location.findByIdAndDelete = jest.fn().mockResolvedValue(mockLocations[0]);
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

    test("Then it should call the response's status method with 200", async () => {
      await deleteLocations(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's json method with the deleted record", async () => {
      const expectedJsonResponse = {
        deleted_location: mockLocations[0],
      };

      await deleteLocations(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedJsonResponse);
    });
  });

  describe("When invoked with and an error occurs", () => {
    test("Then it should call the next received function with ", async () => {
      const expectedErrorMessage = "Location id not found";

      const expectedError = new Error(expectedErrorMessage);

      Location.findByIdAndDelete = jest.fn().mockResolvedValue(false);

      await deleteLocations(req, res, next);

      expect(next).not.toHaveBeenCalledWith(expectedError);
    });
  });
});

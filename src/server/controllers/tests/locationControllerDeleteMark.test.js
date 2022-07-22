const Location = require("../../../database/models/Location");
const User = require("../../../database/models/User");
const mockLocations = require("../../../utils/mocks/mockLocations");
const { deleteLocations } = require("../locationControllers");

const next = jest.fn();

describe("Given a deleteLocations controller", () => {
  const expectedStatus = 200;

  const req = {
    body: { userId: "1" },
    params: {
      locationId: "10",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When invoked with a given a location id corresponding to an existing location in the database in the body of the request", () => {
    Location.findByIdAndDelete = jest.fn().mockResolvedValue(mockLocations[0]);
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

    test("Then it should call the response's status method with 200", async () => {
      await deleteLocations(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's json method with the deleted location", async () => {
      const expectedJsonResponse = {
        deleted_location: mockLocations[0],
      };

      await deleteLocations(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedJsonResponse);
    });
  });

  describe("When invoked with and an error occurs while updating the deleted location", () => {
    test("Then it should call the next received function with the error message 'Location Not Found'", async () => {
      const expectedErrorMessage = "Location Not Found";

      const expectedError = new Error(expectedErrorMessage);

      Location.findByIdAndDelete = jest.fn().mockResolvedValue(false);

      await deleteLocations(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When invoked with and an error occurs trying to find the user owner of the location", () => {
    test("Then it should call the next received function with the error message 'Location Not Found'", async () => {
      const expectedErrorMessage = "Location Not Found";

      const expectedError = new Error(expectedErrorMessage);

      Location.findByIdAndDelete = jest
        .fn()
        .mockResolvedValue(mockLocations[0]);

      User.findByIdAndUpdate = jest.fn().mockResolvedValue(false);

      await deleteLocations(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

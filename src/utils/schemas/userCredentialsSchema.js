const { Joi } = require("express-validation");

const credentialsLoginSchema = {
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(4)
      .max(254)
      .messages({ message: "An email is Required" })
      .required(),
    password: Joi.string()
      .max(15)
      .messages({ message: "A Password is Required" })
      .required(),
  }),
};

const credentialsRegisterSchema = {
  body: Joi.object({
    firstname: Joi.string()
      .max(20)
      .messages({ message: "A First Name is Required" })
      .required(),
    surname: Joi.string()
      .max(20)
      .messages({ message: "A Surname is Required" })
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(4)
      .max(254)
      .messages({ message: "A valid email is Required" })
      .required(),
    password: Joi.string()
      .min(5)
      .max(15)
      .messages({ message: "A valid Password is Required" })
      .required(),
    city: Joi.string()
      .max(35)
      .messages({ message: "The maximun length is 35 for your city address" })
      .required(),
    country: Joi.string()
      .max(35)
      .messages({ message: "The maximun length is 35 for your country" })
      .required(),
  }),
};

module.exports = { credentialsLoginSchema, credentialsRegisterSchema };

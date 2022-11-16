import jwt from "jsonwebtoken";
import User from "./../models/authModel.js";

//3 days
const maxTime = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "secret Key", {
    expiresIn: maxTime,
  });
};

const handleErrors = (error) => {
  const errors = { email: "", password: "" };
  const { code, message } = error;
  if(message === 'Incorrect email') errors.email = 'That email is not registered';
  if(message === 'Incorrect password') errors.email = 'That password is incorrect';
  if(code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
  if(message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: false,
      maxAge: maxTime * 1000,
    });
    res.send({ user: user._id, status: true });
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.send({ errors, status: false });
  }
};

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnyl: false,
      maxAge: maxTime * 1000,
    });
    res.status(201).send({ user: user._id, create: true });
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.send({ errors, create: false });
  }
};

import express from "express";
import {
  addUserValidationSchema,
  loginUserValidationSchema,
} from "./user.validation.js";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();
//register user
router.post(
  "/user/register",
  async (req, res, next) => {
    //extract user from req.body
    const newData = req.body;
    //validate newdata
    try {
      const validateData = await addUserValidationSchema.validate(newData);
      req.body = validateData;
      //call for next
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract new user from req.body
    const newUser = req.body;
    // find user by email
    const user = await User.findOne({ email: newUser.email });
    // if user, throw error
    if (user) {
      return res.status(409).send({ message: "user already exist" });
    }
    //hashing password
    const plainPassword = newUser.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds); //hash compare

    //replace plain password by hashed password
    newUser.password = hashedPassword;
    // create user
    await User.create(newUser);
    // send response
    return res.status(201).send({ message: "user registered successfully" });
  }
);
//login
router.post(
  "/user/login",
  async (req, res, next) => {
    //extract new data
    const newData = req.body;
    //validate new data
    try {
      const validatedData = await loginUserValidationSchema.validate(newData);
      req.body = validatedData;
      //call next function
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract login credentials from req.body
    const loginCredintials = req.body;

    // find user by email
    const user = await User.findOne({ email: loginCredintials.email });
    // if not user,throw error
    if (!user) {
      return res.status(404).send({ message: "Invalid credintials.." });
    }
    // check for password match
    const plainPassword = loginCredintials.password;
    const hashedPassword = user.password;

    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);
    // if password does not match, throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid credintials" });
    }

    //to remove password from res
    user.password = undefined;
    //generate token
    //syntax
    //token=jwt(payload,signature)
    const token = jwt.sign({ email: user.email }, "82b0e9b0b6d"); //sign,varify
    // send response
    return res
      .status(200)
      .send({ message: "login successful", userDetails: user, token: token });
  }
);
export default router;

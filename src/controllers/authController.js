const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res) => {
    try {
      let { firstName, lastName, email, password } = req.body;
  
      const checkEmail = await User.findOne({ email });
  
      if (checkEmail) {
        return res.status(400).json({
          status: "failed",
          message: "Email already exist",
        });
      } 
      // hash incoming password from req.body
      password = await bcrypt.hash(password, 12);
  
      const newUser = { firstName, lastName, email, password };
  
      const createUser = await User.create(newUser); 
  
      const id = createUser._id;
      // sign jwt token with user id as payload
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: `${process.env.JWT_EXPIRES_IN}`,
      });
  
      // push new user to dummy database
 
      res.status(201).json({
        status: "success",
        token,
        data: {
          id: createUser._id,
          firstName: createUser.firstName,
          lastName: createUser.lastName,
          email: createUser.email,
        },
      });
    } catch (err) {
        console.log(err)
      res.status(500).json({
        status: "failed",
        err,
      });
    } 
};

exports.login = async (req, res) => {
    try {
      let { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          status: "failed",
          message: "User does not exist",
        });
      } 
  
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid Credentials!",
        });
      }
  
      const id = user._id;
      // sign jwt token with user id as payload
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: `${process.env.JWT_EXPIRES_IN}`,
      });
  
      // push new user to dummy database
 
      res.status(201).json({
        status: "success",
        token,
        data: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (err) {
        console.log(err)
      res.status(500).json({
        status: "failed",
        err,
      });
    } 
};
const mongoose = require("mongoose");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const DatabaseError = require("../models/databaseError");
const {
  SECRET_JWT_HASH,
  LOG_IN_DURATION,
} = require("../loginDetails");

// not middleware but called when creating cookie
const newCookie = (res, userID, username) => {
  const accessToken = jwt.sign({ userID }, SECRET_JWT_HASH, {
    expiresIn: "3h",
  });

  // cookie expires in 3hrs
  // secure cookie meant for user authentication
  res.cookie("access_token", accessToken, {
    maxAge: LOG_IN_DURATION,
    httpOnly: true,
    ////uncomment secure in production when we switch to https
    ////secure: true
  });

  // cookie expires in 3hrs
  // cookie for frontend to know username. Deleted if not needed
  res.cookie("username", username, { maxAge: LOG_IN_DURATION });
};

const signup = async (req, res, next) => {
  const { username, password } = req.body;

  const newUser = new User({
    username,
    password
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new DatabaseError(err.message));
  }
  newCookie(res, newUser._id, username);

  res.status(201).json({ signedIn: true });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  let existingUser;
  let validCredentials;
  let userID;

  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  // if user cannot be found -> username is wrong
  if (!existingUser) {
    validCredentials = false;
  } else {
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      return next(new DatabaseError(err.message));
    }

    // if password is wrong
    if (!isValidPassword) {
      validCredentials = false;
    } else {
      try {
        await existingUser.save();
      } catch (err) {
        return next(new DatabaseError(err.message));
      }
      userID = existingUser.id;
      validCredentials = true;
      newCookie(res, userID, username);
    }
  }

  res.json({ validCredentials });
};

const logout = async (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("username");

  res.json({ loggedOut: true });
};


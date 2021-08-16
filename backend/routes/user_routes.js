const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/users");
const DatabaseError = require("../models/databaseError");

router.post("/register", async (req, res, next) => {
  const { email, password } = req.body;

  const newUser = new User({
    email,
    password,
  });

  try {
    await newUser.save();
    console.log("registered successfully");
    res.status(201).json({status: "registered successfully"});
  } catch (err) {
    return next(new DatabaseError(err.message));
  }
});



router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  let validCredentials = true;
  let userID;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  // if user cannot be found -> username is wrong
  if (!existingUser) {
    validCredentials = false;
  } else {
    let isValidPassword = false;
    try {
        if (existingUser.password === password) {
            isValidPassword = true;
        }
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
    }
  }

  res.json({ validCredentials });
});

module.exports = router;




const express = require("express");
const {check, validationResult} = require("express-validator");
const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");



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


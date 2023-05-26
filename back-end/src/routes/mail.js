const express = require("express");
const nodemailer = require("nodemailer");

const mailControllers = require("../controllers/mailControllers");
const router = require('express').Router();


router.post("/sendMail", mailControllers.sendMail);

module.exports = router;
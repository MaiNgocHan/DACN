const express = require("express");
const nodemailer = require("nodemailer");

const mailControllers = {
 sendMail: async(req,res) =>{
    const {email} = req.body;
    const {text} = req.body;
    const {main} = req.body;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "caominhsamurai1912@gmail.com", // generated ethereal user
      pass: "kqjqpmrgkvzwxiwg", // generated ethereal password
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'caominhsamurai1912@gmail.com', 
    to: `${email}`, 
    subject: "This is from the admin of study web", 
    text: `${main}`, 
    html: `${text}`, 
  });

  (error) =>{
    return res.json({
        message: "Lỗi",
        error
    });
  }
  return res.json({
    message: `Đã gửi mail vào tài khoản ${email}`
  });
}
}
module.exports = mailControllers;
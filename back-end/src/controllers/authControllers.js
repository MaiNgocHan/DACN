const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


require('dotenv').config();

const authControllers = {
    // Access token
    makeAccessToken:(email)=>{
        return jwt.sign(
            {
                id: email.id,
                type: email.type,
            },
            process.env.JWT_ACCESS_KEY);
    },

    //Register
    registerUser: async(req,res)=>{
        try{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,salt);

            const existingUser = await userModel.findOne({ email: req.body.email });
            if (existingUser) {
            res.status(404).json( "Email này đã tồn tại" );
            } else {
            const newUser = await new userModel({   
                email:req.body.email,
                password: hashed,
                username: req.body.username,
                type: req.body.type,
            });
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
            }

        }catch(error){
            res.status(500).json(error)
        }
    },

    //Login
    loginUser: async(req,res)=>{
        try {
            const email = await userModel.findOne({email: req.body.email});
            const user = await userModel.findOne({email: req.body.email});
            const validPassword = await bcrypt.compare(
                req.body.password,
                email.password
            );
            const statusTypeA = email.statusType;
            if(!email){
                res.status(404).json("Nhập sai email !");
            }
            if(!validPassword){
                res.status(404).json("Nhập sai mật khẩu !");
            }
            if(statusTypeA === false){
                return res.status(403).json("Tài khoản của bạn đã bị khóa !");
            }
                if(email && validPassword){
                    const accessToken =  await authControllers.makeAccessToken(email);
                    //save token to database
                    userModel.findOneAndUpdate ({_id: email}, {$set: {token: accessToken}},{new:true}, (error) => {
                        if(error){
                            console.error(error);
                        }else{
                            console.log('Token đã được lưu');
                        }
                    });
                    res.status(200).json({user, accessToken});
                }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //LogOut
    logoutUser: async(req,res) =>{
        const Deltoken  = req.headers.token;
             await userModel.findOneAndUpdate({token: Deltoken}, {$set: {token: " "}},{new:true}, (error) => {
                if(error){
                    console.error(error);
                }else{
                    res.status(200).json("Đã thoát")
                }
            });  
    }
}
module.exports = authControllers;
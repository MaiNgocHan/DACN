const { findById, findByIdAndDelete } = require("../models/userModel");
const User = require("../models/userModel");

const userControllers ={
    getAllUsers: async(req,res)=>{
        try{
            const user = await User.find();
            res.status(200).json(user);
        }catch(error){
            res.status(500).json(error);
        }
    },
    deleteUser: async(req,res)=>{
        try{
            const user = await User.findByIdAndDelete(req.params.id);         
            res.status(200).json("Xóa người dùng thành công");
        }catch(error){
            res.status(500).json(error);
        }
    },
    findOneUser: async(req,res)=>{
        try{
            const Oneuser = await User.findById(req.params.id);         
            res.status(200).json(Oneuser);
        }catch(error){
            res.status(500).json(error);
        }
    },

    putUpdateUser: async(req,res) => {
        let email = req.body.email;
        let username = req.body.username;
        let userID = req.params.id;
    
        let updateUser = await User.findByIdAndUpdate({_id: userID}, { email: email, username: username}, { new: true })
        if(userID === undefined){
            res.status(500).send('Không tìm thấy người dùng');
        } else{
            res.status(200).json({
                errCode: 0,
                data: updateUser,
            }) 
        }
    },


    changeStatus: async(req,res)=>{
            const changing =  await User.findById(req.params.id)
            await User.findByIdAndUpdate(req.params.id,{statusType: !changing.statusType  },(error,user ) =>{
                if(error){
                    res.status(400).json(error);
                }
                else{
                    res.status(200).json("Đã thay đổi thành công ");
                }
            }).clone().catch(function(error){console.log(error)});            
    }
}

module.exports = userControllers;
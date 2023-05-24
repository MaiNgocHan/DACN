const { default: mongoose } = require("mongoose");
const newsModel = require("../models/newsModel");
const userCollection = mongoose.model("User");
const userModel = require("../models/newsModel");
const middlewareController = require("../middleware/middlewareControllers");

const newControllers ={
    getAllNews: async(req,res)=>{

        try {
            const news = await newsModel.find();
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json("Không tìm thấy người dùng")
        }
    },

    createNews: async(req,res) =>{
        try {    
            const news = await new newsModel({   
                image: req.body.image,
                content: req.body.content,
                title: req.body.title,
            });
            const saveNews = await news.save();
            res.status(200).json(saveNews)
            
        } catch (error) {
            res.status(400).json(error)
        }
    },

    deleteNews: async(req,res) =>{
        try {
            const delNews = await newsModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Xóa bài viết thành công")
        } catch (error) {
            res.status(403).json(error)
        }
    }

}

module.exports = newControllers;
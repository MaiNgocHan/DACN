const { default: mongoose } = require("mongoose");
const newsModel = require("../models/newsModel");
const userCollection = mongoose.model("User");
// const userModel = require("../models/newsModel");
const middlewareController = require("../middleware/middlewareControllers");

const newsAnhModel = require("../models/newsAnhModel");
const newsToanModel = require("../models/newsToanModel");
const newsVanModel = require("../models/newsVanModel");

const newControllers ={
    getAllNews: async(req,res)=>{
        try {
            const news = await newsModel.find()
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json("Không tìm thấy bài viết")
        }
    },
    getToanNews: async(req,res)=>{
        try {
            const findNews = await newsModel.find({type: "Toán"});
            res.status(200).json(findNews);
        } catch (error) {
            res.status(500).json("Không tìm thấy bài viết")
        }
    },
    getVanNews: async(req,res)=>{
        try {
            const findNews = await newsModel.find({type: "Văn"});
            res.status(200).json(findNews);
        } catch (error) {
            res.status(500).json("Không tìm thấy bài viết")
        }
    },
    getAnhNews: async(req,res)=>{
        try {
            const findNews = await newsModel.find({type: "Anh"});
            res.status(200).json(findNews);
        } catch (error) {
            res.status(500).json("Không tìm thấy bài viết")
        }
    },
    getOtherNews: async(req,res)=>{
        try {
            const findNews = await newsModel.find({type: {$nin: ["Toán", "Văn", "Anh"]}});
            res.status(200).json(findNews);
        } catch (error) {
            res.status(500).json("Không tìm thấy bài viết")
        }
    },


    createNews: async(req,res) =>{
        try {    
            const news = await new newsModel({   
                image: req.body.image,
                content: req.body.content,
                title: req.body.title,
                type: req.body.type,
            });
            const saveNews = await news.save();
            res.status(200).json(saveNews)
            
        } catch (error) {
            res.status(400).json(error)
        }
    },

    // createNewsAnh: async(req,res) =>{
    //     try {    
    //         const news = await new newsAnhModel({   
    //             image: req.body.image,
    //             content: req.body.content,
    //             title: req.body.title,
    //         });
    //         const saveNews = await news.save();
    //         res.status(200).json(saveNews)
            
    //     } catch (error) {
    //         res.status(400).json(error)
    //     }
    // },
    // createNewsToan: async(req,res) =>{
    //     try {    
    //         const news = await new newsToanModel({   
    //             image: req.body.image,
    //             content: req.body.content,
    //             title: req.body.title,
    //         });
    //         const saveNews = await news.save();
    //         res.status(200).json(saveNews)
            
    //     } catch (error) {
    //         res.status(400).json(error)
    //     }
    // },
    // createNewsVan: async(req,res) =>{
    //     try {    
    //         const news = await new newsVanModel({   
    //             image: req.body.image,
    //             content: req.body.content,
    //             title: req.body.title,
    //         });
    //         const saveNews = await news.save();
    //         res.status(200).json(saveNews)
            
    //     } catch (error) {
    //         res.status(400).json(error)
    //     }
    // },

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
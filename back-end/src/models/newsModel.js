const mongoose = require('mongoose');


const newsSchema = new mongoose.Schema({ 
    image:{
        type: String,
        require: true,
        default: "user", 
    },
    content:{
        type: String,
        default: true, 
    },
    title:{
        type: String,
        default: "", 
        require: true,
    },
},{timestamps:true});

module.exports = mongoose.model("New",newsSchema);

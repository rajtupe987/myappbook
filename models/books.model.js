const mongoose = require("mongoose");

const bookschema = new mongoose.Schema({
    Title: { type: String, required: true },
    Author: { type: String, required: true },
    // (a dropdown select tag with the following values: Fiction, Science, Comic)
    Genre: { type: String,enum: ["Fiction", "Science", "Comic"], required: true, },
    Description: { type: String, required: true },
    Price:{type:Number,required:true},
});

const bookModal=mongoose.model("mybookapp",bookschema);


module.exports={
    bookModal
}
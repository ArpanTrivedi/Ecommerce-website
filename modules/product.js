const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema;



var productSchema=new mongoose.Schema({
    name:{
        type:String,
        maxlength:32,
        required:true,
        trim:true
    },
    description:{
        type:String,
        maxlength:2000,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        required:true
    },
    category:{
        type:ObjectId,
        ref:"Category",
        required:true
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true});


module.exports=mongoose.model("Product",productSchema);
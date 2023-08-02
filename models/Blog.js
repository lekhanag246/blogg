const {Schema,model}=require('mongoose')
let blogSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    snippet:{
        type:String,
        required:true,
        trim:true,
    },
    body:{
        type:String,
        required:true,
        trim:true,
    }},{timestamps:true})

    module.exports = model("blog",blogSchema)
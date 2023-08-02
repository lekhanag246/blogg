const express = require('express');
const blog = require('../models/Blog')
let blogRoutes = express.Router()

blogRoutes.get('/',(req,res)=>{
    res.render('home')
})
blogRoutes.get('/about',(req,res)=>{
    res.render('about')
})
blogRoutes.get('/blog',(req,res)=>{
    res.render('blog')
})
blogRoutes.post('/blog',async (req,res)=>{
    let {title,snippet,body} = req.body
    try{
        await blog.create({
            title,snippet,body
        })
    }catch(error){
        console.log("error creating documents",error);
    }
    res.redirect('/viewBlogs')
})

blogRoutes.get('/viewBlogs',async (req,res)=>{
    try{
        let blogs = await blog.find().lean() ;
        res.render('viewBlogs',{blogs})

    }catch(error){
        console.log("error getting documents from db",error);
    }
})

blogRoutes.get('/viewBlogs/:id',async (req,res)=>{
    let id = req.params.id
    try{
        // console.log(await blog.findOne({_id:id}).lean()) ;
        let foundBlog = await blog.findOne({_id:id})
        // console.log("blog found")
        let date = foundBlog.createdAt ;
        let month = ["JAN","FEB","MARCH","APRIL","MAY","JUNE","JULY","AUG","SEPT","OCT","NOV","DEC"]
        let displayDate =month[date.getMonth()]+" "+date.getDate().toLocaleString({minimumIntegerDigits:2})+", "+date.getFullYear()
        res.render(`viewBlog`,{foundBlog,displayDate})
    }catch(error){
        console.log("error getting 1 document from db",error);
    }
})

blogRoutes.delete('/viewBlogs/:id',async (req,res)=>{
    let id = req.params.id 
    console.log("in delete handler",id);
    try{
        await blog.deleteOne({_id:id})
        res.redirect('/viewBlogs')
    }catch(error){
        console.log("error deleting the record")
    }
})

blogRoutes.get('/register',(req,res)=>{
    res.render('register')
})

module.exports=blogRoutes;
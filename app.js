const express = require('express')
const app = express()
if(process.env.NODE_ENV!=='production'){
     require('dotenv').config()
}
const mongoose = require('mongoose')
const methodOverride = require("method-override")

const blogRoutes = require('./routes/blogRoutes.js')



app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

//to add css
app.use(express.static(__dirname+'/public'))

//register templating engine
app.set('view engine','ejs')

app.use(blogRoutes)
//if there is no other route then 
app.use((req,res)=>{
    res.render('404')
})

async function db(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("SUCCESSFULLY CONNECTED TO DB")
    }catch(error){
        console.log("error connecting to db")
    }
}
db()

// app.get('/',(req,res)=>{
//     // res.send('home')
// })



app.listen(process.env.PORT,(error)=>{
    if(error)
        console.log('error creating and connecting to server')
    else
        console.log(`created a server and listening to port ${process.env.PORT}`)
})
 
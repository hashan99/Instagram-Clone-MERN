const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')
// 89mgB89korkx2RiM

require('./models/user')

// const customMiddleware = (req,res,next)=>{
//     console.log("middleware executed!!")
//     next()
// }

// // app.use(customMiddleware)

// app.get('/',(req,res)=>{
//     console.log("Home")
//     res.send("Hello World")
// })

// app.get('/about',customMiddleware,(req,res)=>{
//     console.log("about")
//     res.send("about page")
// })

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.connection.on('connected', ()=>{
    console.log("connection to mongo successfull!!")
})

mongoose.connection.on('error', (err)=>{
    console.log("error connecting", err)
})

app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})
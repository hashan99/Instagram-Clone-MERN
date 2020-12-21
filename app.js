const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')
// 89mgB89korkx2RiM

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

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

//deployement
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})

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
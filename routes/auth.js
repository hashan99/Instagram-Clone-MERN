const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
//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

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

// router.get('/protected',requireLogin,(req,res)=>{
//     res.send("Hello User")
// })

router.post('/signup',(req,res)=>{
    // console.log(req.body)
    const {name,email,password,pic} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error:"please add all the fields"})
    }
    // res.json({message:"successfully posted"})
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name,
                pic
            })
    
            user.save()
            .then(user=>{
                transporter.sendMail({
                    to:user.email,
                    from:"admin@spreadin.me",
                    fromname: 'Spreadin',
                    subject:"spreadin-signup successfully",
                    html:"<h1>Hello, Welcome to Spreadin</h1>"
                })
                res.json({message:"Signed up succesfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    })       
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"please add email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"succesfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"please add email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router
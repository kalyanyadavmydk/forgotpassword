const express=require('express')
const bcrypt = require('bcrypt');
const cors=require('cors')
const bodyparser=require('body-parser')
var randomstring = require("randomstring");
const nodemailer=require('nodemailer')
const app=express()

app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

const user=require('./models/userdetals-schema');
const db=require('./config/mongoose');



app.listen(3000,()=>{
    
    console.log("server stared successfully" )
})

app.post('/login',(req,res)=>{
    user.findOneAndUpdate({email:req.body.email},{$set:{generatepassword:undefined}},{new:true},function(err,docs){
        console.log(docs)
        if(err){
            res.send({message:"Error Try reloading Again"})
        }
        if(!docs){res.send({message:"No User Exists"})}
        if(docs){
            // docs[0].generatepassword=undefined
            // docs.save()
            
            bcrypt.compare(req.body.password,docs.password,function(err,result){
                console.log(err,result)
                if(err){
                    res.send({message:"Try Again"})
                }
                if(result===true){
                    res.send({message:"Login Successfully"})
                }
                if(result===false){
                    res.send({message:"Wrong Password"})
                }
            })
        }
    })
})


app.post('/createuser',(req,res)=>{

    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err){
            res.send({message:"error while creating password"})
        }
       user.find({email:req.body.email},function(err,docs){
           if(err){
              res.send(err)
           }
           if(docs.length<=0){
               user.create({
                   email:req.body.email,
                   password:hash
               },function(err){
                   if(err){
                       res.send({message:"failed in creaton"})
                   }
                   res.send({message:"created"})
               })
           }else
           res.send({message:"already email exists"})
       })
    })
})



app.post('/forgotpassword',(req,res)=>{
    console.log(req.body)
    const otp=randomstring.generate(10)
    bcrypt.hash(otp,10,function(err,hash){
        if(err){
            res.send({message:"ReTry"})
        }
        else{
            user.updateOne({email:req.body.email},{$set:{generatepassword:hash}},function(err,docs){
                if(err){
                    res.send({message:"try again"})
                }
                else{
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'kingkalyanyadav@gmail.com',
                          pass: 'Itachi@Uchia'
                        }
                      });
                    var mailOptions = {
                        from: "kingkalyanyadav@gmail.com",//add admin email
                        to: req.body.email,//add user email
                        subject: 'One Time Generation Password',
                        text: otp
                      };
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(234567890,error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                    res.send({message:"OTP sent to your mail"})
                }
            })
        }
    })

})

app.post('/OneTimePassword',(req,res)=>{
   user.find({email:req.body.email},function(err,docs){
       if(err){
           res.send({message:"Try Again"})
       }
       else{
           bcrypt.compare(req.body.password,docs[0].generatepassword,function(err,result){
               console.log(result,docs[0].generatepassword)
               if(err){
                   res.send({message:"TryAgain"})
               }
               if(result===true){
                   res.send({message:"login Success And Reset Your Password"})
               }
               if(result===false){
                   res.send({message:"Wrong Password"})
               }
           })
       }
   })
})



app.post('/resetpassword',(req,res)=>{
    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err){res.send({message:"TryAgain"})}
        else{
            user.updateOne({email:req.body.email},{$set:{password:hash,generatepassword:undefined}},function(err,docs){
                if(err){res.send({message:"TryAgain"})}
                else{
                    res.send({message:"Password has been resset"})
                }
            })
        }
    })
})
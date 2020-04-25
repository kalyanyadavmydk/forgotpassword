const mongoose=require('mongoose')
mongoose.set('useFindAndModify', false);
const eventschema=new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String
    },
    generatepassword:{
        type:String
    }
})
module.exports=mongoose.model('userdetails',eventschema);

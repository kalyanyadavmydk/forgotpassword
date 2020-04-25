const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/userdetails')
const db= mongoose.connection
db.on('error',console.error.bind(console,'error connecting to db'))
db.once('open',function(){
    console.log("database successfully created")
})
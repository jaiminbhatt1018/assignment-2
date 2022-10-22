const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/StudentsnewDB",{ useNewUrlParser: true },(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("DB Connected");
    }
});

module.exports = mongoose;
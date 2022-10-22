const express=require('express');
const fs= require('fs');
const app= express();
const port=3000;
const multer= require('multer');
const path= require('path');
const validTypes=['image/jpg','image/jpeg','image/png','image/svg'];

var storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        const destination ='./upload'
        if(fs.existsSync(destination)){
            cb(null,destination);
        }else{
            fs.mkdir(destination,(err)=>{
                err?console.log('destination  not found!'):cb(null,destination);
            })
        }
    },
    filename:(req,file,cb)=>{
        let filename=`${file.fieldname}_${Date.now()}`;
        cb(null,filename);
    }   
})
var upload=multer({
    storage:storage,
    checkValidFileType:(req,file,cb)=>{
        if(validTypes.includes(file.mimetype)){
            cb(null,true);
        }
        else{
            cb(null,false);
            return(cb(`only ${validTypes} are accepted!!!`))
        }
    }
})
app.post('/upload',upload.single('file'),(req,res)=>{
    return res.send('File Uploaded Successfully!');
})
app.post('/upload-multiple',upload.array('files',4),(req,res)=>{
    return res.send('Files Uploaded Successfully!');
})
app.get('/',(req,res)=>{
    return res.sendFile(__dirname+'/views/upload.html');
})
app.listen(port,()=>{
    console.log(`app listening on http://localhost:${port}`);
});
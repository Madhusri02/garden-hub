const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination : function(req , res , call_back_fun){
        call_back_fun(null , 'uploads/;' )
    },
    filename : function(req , file, call_back_fun){
        const parts = file.originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = file.originalname + '-' + Date.now() + '.' + ext;
        call_back_fun(null , newPath);
    }
});

const upload = multer({storage : storage});

module.exports = upload;
import multer from 'multer';
import path from 'path';
import {fileURLToPath} from 'url'
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// navigate up from middleware to the project root
const projectRoot = path.resolve(__dirname,'../../');
const tempUploadPath = path.join(projectRoot,'public/temp');

// Ensure the directory exists
if(!fs.existsSync(tempUploadPath)){
    fs.mkdirSync(tempUploadPath,{recursive:true});
    console.log(`Temp upload directory created at: ${tempUploadPath}`);
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'/public/temp'))
    },
    filename: function(req,file,cb){
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9)
        // cb(null,file.fieldname  + '-' + uniqueSuffix)
        cb(null,file.originalname)
    }
})

export const upload = multer({ 
    storage,
});
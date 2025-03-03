import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.ClOUDINARY_cloud_name,
        api_key:process.env.ClOUDINARY_api_key,
        api_secret:process.env.ClOUDINARY_api_secret,
    });
    
    // Upload an image
    const uploadOnCloudinary = async(localFilePath)=>{
        if(!localFilePath) return null
        // upload now
        try{
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: 'auto'
            })
            fs.unlinkSync(localFilePath);
            console.log("File Uploaded Successfully. URL is: ",response.url)
            return response;
        }catch(err){
            fs.unlinkSync(localFilePath);
            return null;
        }
    }
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);   
    
    
    export {uploadOnCloudinary};

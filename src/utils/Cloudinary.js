import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (LocalFilePath) => {
    try{
        if(!LocalFilePath) return null;
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(LocalFilePath,{
            resource_type: "auto",
        })
        //file has been uploaded successfully
        fs.unlinkSync(LocalFilePath);//remove the locally saved file
        return response;
    }
    catch(error){
        fs.unlinkSync(LocalFilePath);//remove the locally saved file when the uploading operation failed.
        return null;
    }
}

export default uploadOnCloudinary;
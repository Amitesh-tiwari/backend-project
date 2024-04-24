import asyncHandler from "./../utils/asyncHandler.js";
import ApiErros from "../utils/ApiErrors.js";
import {User} from "../models/user.model.js";
import uploadOnCloudinary from "../utils/Cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js";
 

const registerUser = asyncHandler(async (req, res) => {
   
        //getting the user data from the frontend
        //imposing validations
        //checking the image and the avatar image
        //uploading them ion the cloudinary
        //saving the user data in the database
        //creating user object- create entry in the database
        //remove password and refresh token from the response
        //check for user creation
        //return the response

    const {fullname, email, password, username} = req.body
    console.log("email", email);
    if(
        [fullname, email, password, username].some((field) => field?.trim() === "")
    ){
        throw new ApiErros(400, "All fields are required");
    }

    const existinguser = User.findOne({
        $or : [{email},{username}]
    })

    if(existinguser){
        throw new ApiErros(409, "User with this email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiErros(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiErros(400, "Avatar is required");
    }

    const user = await User.create({
        fullname,
        email,
        password,
        username : username.toLowerCase(),
        avatar : avatar.url,
        coverImage : coverImage?.url || ""
    })

    const checkUser = await User.findById(user._id).select("-password -refreshToken");
    //select is used to remove the fields from the response
    //With eveey field, mongodb adds a entry of _id with it so to check the user it is a good practice

    if(!checkUser){
        throw new ApiErros(500, "User is not created properly");
    }

    return res.status(201).json(
        new ApiResponse(200, checkUser, "User registered successfully")
    )
});

export default registerUser;
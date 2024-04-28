import asyncHandler from "./../utils/asyncHandler.js";
import ApiErros from "../utils/ApiErrors.js";
import User from "../models/user.models.js"
import uploadOnCloudinary from "../utils/Cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js";
 
const generateRefreshAndAccessToken = async(userId) => {
    try {
        const user =  await User.findById(userId);
        const accessToken = user.generateAcessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validationBeforeSave : false});

        return {accessToken, refreshToken};

        
    } catch (error) {
        throw new ApiErros(500, "Something went wrong while generating the tokens");
        
    }
 }
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

    const existinguser = await User.findOne({
        $or : [{email},{username}]
    })

    if(existinguser){
        throw new ApiErros(409, "User with this email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    console.log(avatarLocalPath);

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

const loginUser = asyncHandler(async (req, res) => {
    //req.body ->data
    //check for email or username
    //find the user
    //password check
    //access and refresh token generated
    //send cookie

    const {email, password, username} = req.body;
    if(!(email || username)){
        throw new ApiErros(400, "Email and username are required");
    }

    const user =  await User.findOne({
        $or : [{email},{username}]
    })

    if(!user){
        throw new ApiErros(404, "User not found");
    }

    const isPasswordValid =  await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiErros(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    //again querying database for the user 

    const options ={
        httpOnly : true,
        secure : true
    }
    //this will make the cookie to get changed only from the server side not from the frontend also.
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        ) 
    )
  

});

const logoutUser = asyncHandler(async (req, res) => {
   await User.findByIdAndUpdate(req.user._id, 
        {
            $unset : {
                refreshToken : undefined
            }
        },{
            new : true
        }
   );

   const options = {
         httpOnly : true,
         secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out successfully")
    )

});

export default 
registerUser
loginUser,
logoutUser
;
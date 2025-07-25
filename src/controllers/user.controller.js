import {asyncHandler} from '../utils/asyncHandler.js';
import { upload } from '../middlewares/multer.middleware.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import User from "../models/user.model.js"
import {uploadOnCloudinary} from "../services/cloudinary.js";


const generateAccessTokenAndRefreshToken = async(userId)=>{
   try{

   }catch(error){
      throw new ApiError(500,"Something went wrong when generating tokens")
   }
}


const registerUser = asyncHandler(async(req,res)=>{
   // get user details from front end
    const {fullName,email,username,password} = req.body;
    console.log(fullName,email);
   // validation - not empty
   if(
    [fullName,email,username,password].some((field)=> field?.trim() === "")
   ){
        throw new ApiError(
            400,
            "All fields are required",
        )
   }


   // check if user already exists: username, email

   const existedUser = await User.findOne({
    $or: [{username},{email}] 
   });

   if(existedUser){
    throw new ApiError(409,"User with email or username already exist");
   }

   // check for  images, check for avatar

   const avatarLocalPath = req.files?.avatar[0]?.path;

   const coverImageLocalPath = req.files?.cover[0]?.path;
   console.log(req.files,"file here");

   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required");
   }

   // upload them to cloudinary,avatar

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(400,"Avatar file is required");
  }

   // create user object - create entry in db

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),

   })

   // remove password and refresh token filed from response

 const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
 )

 if(!createdUser){
    throw new ApiError(500, "Something went wrong when regestring the user");
 }

   // check for user creaion

   // return response
   
   res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully")
   );

})

const loginUser  = asyncHandler(async(req,res)=>{
   // req body - email, password
   // username or email
   // find the user
   // check for password match
   // generate access token and refresh token
   // send cookies to the browser
   // return response

   const {email,username, password} = req.body;
   if(!email || !password){
    throw new ApiError(400,"Email and password are required");
   }

   // check for user
   const user = await User.findOne({
    $or: [{email},{username}]
   }).select("+password");

   if(!user2){
      throw new ApiError(401,"User does not exist");
   }

   const isPasswordValid = await user.isPasswordCorrect(password);
   if(!isPasswordValid){
      throw new ApiError(401,"Invalid credentials");
   }

      throw new ApiError(401,"Invalid credentials");


   }); 


   export {registerUser,loginUser};




import mongoose, {isValidObjectId} from "mongoose"
import Video from "../models/video.model.js"
import User from "../models/user.model.js"
import ApiErrors from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import uploadOnCloudinary from "../utils/Cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    if(userId && !isValidObjectId(userId)) {
        throw new ApiErrors.BadRequest("Invalid user id")
    }
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { [sortBy]: sortType }
    }
    const queryOptions = {} 
    
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    const titleLocalPath  = await uploadOnCloudinary(title)
    const descriptionLocalPath = await uploadOnCloudinary(description)
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const video = await Video.findById(videoId)
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
    await Video.findByIdAndUpdate(
        req.params.videoId,
        {
            title: req.body.title,
            description: req.body.description,
            thumbnail: req.body.thumbnail
        },
        {
            new: true,
            runValidators: true
        }
    )

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    deleteVideo = await Video.findById(videoId).select("-deleteVideo")
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    videoFile: {
        type:String, // URL from cloudinary or imgbb
        required: true
    },
    thumbnail: {
        type:String, // URL from cloudinary or imgbb
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type:String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
   

},{timestamps: true});


const Video = mongoose.model('Video',videoSchema);

export default Video;
import mongoose from "mongoose";
const imagePostSchema = mongoose.Schema({
    userId: {
        type:String,
        required:true,
        
    },
   
    imageLink:{
        type:String,
        required:true
    },
    imageLabel:{
        type:String,
        required:false
    }
})

const imagePost = mongoose.model('imagepost', imagePostSchema);
export default imagePost;
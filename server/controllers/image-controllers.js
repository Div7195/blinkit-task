import grid  from "gridfs-stream";
import mongoose from "mongoose";
const url = 'https://blinkit-task-backend.vercel.app'

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open',()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'fs'
    });
    gfs= grid(conn.db, mongoose.mongo);
    gfs.collection('fs');

})

export const uploadImageController=(request , response)=>{
    try {
    if(!request.file){
        return response.status(404).json({msg: "File Not Found"})
    }

    const imageUrl = `${url}/file/${request.file.filename}`;

    return response.status(200).json(imageUrl);
} catch (error) {
    console.log(error)
    return
}
}



export const getImageController = async(request , response) => {
    try {
        const file = await gfs.files.findOne({ filename: request.params.filename })
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);

    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: error.message});
    }
}
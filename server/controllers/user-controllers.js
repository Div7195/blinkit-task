import User from "../model/user-schema.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import token from '../model/token-schema.js'

import ImagePost from "../model/imagepost-schema.js";
export const signupUserController = async(request, response) => {
    try {
        let temp = {};
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        
        const user = {username: request.body.username, password: hashedPassword, imagePosts:[]};
        const newUser = new User(user);
        await newUser.save();
        
       
        
        return response.status(200).json({temp, msg:'signup successfull'})
    } catch (error) {
        return response.status(500).json(error);
    }
}

export const loginUserController = async(request, response) => {
    
    let user = await User.findOne({username : request.body.username});
    if(!user){
        return response.status(400).json({msg:'Username does not exist'});
    }
    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if(match){
            if(request.body.role !== user.role){
                return response.status(400).json({msg:'Account does not exist'});
            }
             const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn :'200m' });
             const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
             const newToken = new token({token:refreshToken});
             await newToken.save();
             return response.status(200).json({accessToken : accessToken, refreshToken : refreshToken, username : user.username, userId:user._id, msg:"success"});
        }else{
            return response.status(400).json({msg:'Password does not match'});
        }
    } catch (error) {
        return response.status(500).json({msg:'Error while login user'});
    }
}

export const getAllImagePostsController = async(request, response) => {

    try{
        let objArrayOfPosts = [];
        objArrayOfPosts = await ImagePost.find({userId:request.query.userId});

        return response.status(200).json({objArrayOfPosts});
    }catch(error){
        return response.status(500).json('failed posts fetching');
    }
}

export const saveImagePostController = async(request, response) => {

    let temp = await User.findOne({_id:request.query.userId});
    if(!temp){
        return response.status(409).json({msg:'unsuccessfull'});
    }
    try {
        const newPost = new ImagePost(request.body);
        await newPost.save();
        temp.imagePosts.push(newPost._id)
        const options = { new: true };
        console.log(temp)
        await User.findOneAndUpdate({_id:request.query.userId}, temp, options);
        return response.status(200).json({msg:'created post successfully'})
    } catch (error) {

        console.log(error)
    }
}
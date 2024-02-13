import mongoose from "mongoose";

const dbConnection = async (username, password) =>{
    const URL = `mongodb+srv://${username}:${password}@movieverse-app.tpux4jp.mongodb.net/test2?retryWrites=true&w=majority`

    try {
        await mongoose.connect(URL);
        console.log("Database connected succesfully");
    } catch (error) {
        console.log("Error while connecting to database:", error);
    }
}
export default dbConnection;
import mongoose from "mongoose";


const connectDB = async () => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/paytm`);
       console.log(`MongoDB is connected successfully host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`MongoDB connection error`, error.message);
        process.exit(1);
    }
}

export default connectDB;
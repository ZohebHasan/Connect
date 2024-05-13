import mongoose from "mongoose";
import dotenv from "dotenv";
import { ConnectOptions } from "mongoose";

dotenv.config();
const connection_string ='mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.ny9wvom.mongodb.net/Connect_Test?retryWrites=true&w=majority';

// Function to connect to MongoDB
export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(connection_string, { useNewUrlParser: true } as ConnectOptions);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
};
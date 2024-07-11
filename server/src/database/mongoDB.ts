import mongoose from "mongoose";
import dotenv from "dotenv";
import { ConnectOptions } from "mongoose";

dotenv.config();
const connection_string ='mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.kacb3bl.mongodb.net/?retryWrites=true&w=majority&appName=Connect';
// fNXADjxipNKubPlP
// Function to connect to MongoDB
export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(connection_string, { useNewUrlParser: true } as ConnectOptions);
        console.log('Connected to MongoDB');
    } catch (error) {
        const connection_string = 'mongodb://localhost:27017/Connect';
    
        console.error('Error connecting to MongoDB: ', error);
    }
};



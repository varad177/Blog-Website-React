
import mongoose from "mongoose"

const connection = async () => {
    const MONGO_URL = process.env.MONGO_URL;

    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
        console.log("db connected successfully");

    } catch (error) {
        console.log("error while connecting with the database", error.message);

    }
}

export default connection;
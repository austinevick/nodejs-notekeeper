import mongoose from "mongoose";


const connection = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connection successful');
    } catch (err) {
        console.log(err.message);
    }

};

export default connection;
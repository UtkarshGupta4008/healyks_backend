const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error(`Error in connecting to mongoDB:${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

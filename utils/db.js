const mongoose = require("mongoose");
const logger = require("./logger");

/**
 * DB connection.
 * @author Harrsh Patel
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        logger.info("MongoDB connected");
    } catch (error) {
        logger.error(`${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

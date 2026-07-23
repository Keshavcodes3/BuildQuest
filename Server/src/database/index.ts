import mongoose from 'mongoose';
import { apiConfig } from '../config/env.js';

const connectToDb = async (): Promise<void> => {
    try {
        const mongoUri = apiConfig.MONGO_URI || 'mongodb://localhost:27017/your_database_name';

        const connectionInstance = await mongoose.connect(mongoUri);

        console.log(`\nMongoDB connected successfully! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectToDb;
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/career-guidance');
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Ensure the unique index on username is removed if it exists
        // as we only want unique emails now.
        try {
            const usersCollection = mongoose.connection.db.collection('users');
            await usersCollection.dropIndex('username_1');
            console.log('Unique index on username dropped successfully');
        } catch (idxError) {
            // Index might not exist, which is fine
            if (idxError.codeName !== 'IndexNotFound') {
                console.warn('Note: Could not drop username index (it might not exist or is already gone)');
            }
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error('Make sure MongoDB is running locally on port 27017');
        process.exit(1);
    }
};

export default connectDB;

import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    interests: [String],
    skills: [String],
    academicDetails: String,
    coursePreference: String
}, { _id: false }); // _id: false tells Mongoose not to create an _id for this subdocument

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: profileSchema,
        default: {}
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;

import User from '../models/User.js';

export const getProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.profile || {});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProfile = async (req, res) => {
    const userId = req.user.id;
    const profileData = req.body;
    console.log('Received profile update data:', profileData);

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update profile fields explicitly
        if (!user.profile) {
            user.profile = {};
        }

        // Map fields explicitly to ensure no Mongoose internal properties are spread
        const fields = ['name', 'email', 'phone', 'interests', 'skills', 'academicDetails', 'coursePreference'];
        fields.forEach(field => {
            if (profileData[field] !== undefined) {
                user.profile[field] = profileData[field];
            }
        });

        // Mark as modified to ensure Mongoose detects changes in the nested object
        user.markModified('profile');
        await user.save();

        // Verify persistence by re-fetching
        const updatedUser = await User.findById(userId);
        console.log('Profile persisted in DB:', updatedUser.profile);

        res.json({ message: 'Profile updated successfully', profile: updatedUser.profile });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

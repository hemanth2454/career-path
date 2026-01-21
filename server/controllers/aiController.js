import User from '../models/User.js';
import { getRecommendations } from '../services/aiService.js';

export const getAIRecommendations = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const recommendations = getRecommendations(user.profile);
        res.json(recommendations);
    } catch (error) {
        console.error('AI Recommendations Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

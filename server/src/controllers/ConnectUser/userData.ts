import User from '../../models/userModel';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/authMiddleware'; // Adjust the path as necessary

export const getUserData = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id; // Safely access user ID

    if (!userId) {
        console.log("User Id don't exist, unable to send data back")
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    try {
        // Find user by ID
        const user = await User.findById(userId);

        if (!user) {
            console.log("User Id don't exist, unable to send data back")
            return res.status(404).json({ message: 'User not found' });
        }

        // Prepare the user data to send back
        const userData = {
            userId: user.id,
            fullName: user.fullName,
            username: user.username,
            isVerified: user.isVerified,
            pronouns: user.pronouns
        };
        console.log("Found user, data has been sent")
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

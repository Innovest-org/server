const User = require('../db/models/userModel');
const Admin = require('../db/models/adminModel');

const checkRole = (roles) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            let user;

            // Check if the user is an admin or a regular user
            if (req.user.role === 'ADMIN' || req.user.role === 'SUPER_ADMIN') {
                user = await Admin.findOne({ admin_id: userId });
            } else {
                user = await User.findById(userId);
            }

            // Check if the user has the required role
            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Access denied: insufficient permissions.' });
            }

            next();
        } catch (error) {
            console.error('Error checking user role:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    };
};

module.exports = checkRole;

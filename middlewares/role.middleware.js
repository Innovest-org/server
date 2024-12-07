const { User } = require('../db/models/userModel');
const Admin = require('../db/models/adminModel');

const checkRole = (roles) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized: No user found' });
            }

            const userId = req.user.id;
            // console.log('User ID:', userId,)
            let user;
            if (req.user.role === 'ADMIN' || req.user.role === 'SUPER_ADMIN') {
                user = await Admin.findOne({ admin_id: userId });
                if (!user) {
                    console.log('User not found in Admin collection');
                }
            } else {
                user = await User.findOne({ id: userId });
                if (!user) {
                    console.log('User not found in User collection');
                }
            }
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

const {User} = require('../../db/models/userModel');

class UserDao {
    async createUser(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async updateUser(userId, updateData) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { id: userId }, 
                updateData,
                { new: true, runValidators: true }
            );
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        }catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async deleteUser(userId) {
        try {
            const deletedUser = await User.findOneAndDelete({ id: userId });
            if (!deletedUser) {
                throw new Error('User not found');
            }
            return deletedUser;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findOne({ id: userId });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }catch (error) {
            throw new Error('Error getting user: ' + error.message);
        }
    }

    async getAllUsers() {
        try {
            return await User.find();
        } catch (error) {
            throw new Error('Error getting users: ' + error.message);
        }
    }

    async getUserByEmail(email) {
        try {
            return await User.findOne({ email : email });
        } catch (error) {
            throw new Error('Error getting user: ' + error.message);
        }
    }

    async getUserByUsername(username) {
        try {
            return await User.findOne({ username : username});
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }


}

module.exports = new UserDao();
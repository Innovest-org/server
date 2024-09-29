const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionsEnum = [
  'CREATE_USER',
  'DELETE_USER',
  'UPDATE_USER',
  'VIEW_USER',
  'MANAGE_ROLES',
  'VIEW_REPORTS',
];

const adminSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: {
      type: String,
      default: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1628684396/avatars/avatar-1_ymq8zg.png',
    },
    role: {
      type: String,
      enum: ['ADMIN', 'SUPER_ADMIN'],
      default: 'ADMIN',
    },
    permissions: {
      type: [String],
      enum: permissionsEnum,
      default: [],
      required: true,
    },
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }]
  },
  { timestamps: true },
);

const adminCommunitySchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // Reference to the admin
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' }, // Reference to the community
  role: { type: String, enum: ['MANAGER', 'MODERATOR'], default: 'MANAGER' }, // Optional role within the community
  createdAt: { type: Date, default: Date.now } // Timestamp for when the relationship was created
});

const Admin = mongoose.model('Admin', adminSchema);
const AdminCommunity = mongoose.model('AdminCommunity', adminCommunitySchema);

module.exports = {
  Admin,
  AdminCommunity
};

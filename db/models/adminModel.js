const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

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
    admin_id: { type: String, default: uuidv4, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: {
      type: String,
      default: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1628684396/avatars/avatar-1_ymq8zg.png',
    },
    admin_state: {
      type: String,
      enum: ['APPROVER', 'REJECTOR'],
      default: 'APPROVER',
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
    approved_pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
  },
  { timestamps: true },
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;

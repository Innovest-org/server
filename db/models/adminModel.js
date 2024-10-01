const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const permissionsEnum = [
  'CREATE_USER_OR_ADMIN',
  'DELETE_USER_OR_ADMIN',
  'UPDATE_USER_OR_ADMIN',
  'VIEW_USER_OR_ADMIN',
  'MANAGE_ROLES_OF_ADMIN',
  'CREATE_COMMUNITY',
  'DELETE_COMMUNITY',
  'UPDATE_COMMUNITY',
  'VIEW_COMMUNITY',
  'CREATE_USER',
  'DELETE_USER',
  'UPDATE_USER',
  'VIEW_USER',
  'MANAGE_ADMINS',
];


const AdminSchema = new Schema(
  {
    admin_id: { type: String, default: uuidv4, unique: true },
    first_name: { type: String},
    last_name: { type: String},
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
      default: 'SUPER_ADMIN',
    },
    permissions: {
      type: [String],
      enum: permissionsEnum,
      default: ['CREATE_USER_OR_ADMIN'],
    },
    approved_pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
  },
  { timestamps: true, },
);

// Set admin_id as the document identifier
AdminSchema.set('toJSON', {
  transform: function (doc, ret) {
      delete ret._id; // Remove _id from the response
      return ret;
  }
});
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');
const uniqueValidator = require('mongoose-unique-validator');

// User Schema
const userSchema = new Schema(
  {
    id: { type: String, default: uuidv4, unique: true },

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ['ENTREPRENEUR', 'INVESTOR', 'ADMIN'],
      default: 'ENTREPRENEUR',
    },
    country: { type: String, required: true },
    userBackground: { type: String },
    experience: { type: String },
    investment_preferences: [{ type: String }],
    idNationality: { type: Number },
    profile_image: {
      type: String,
      default: 'https://i.ibb.co/6WtQfMm/default.png',
    },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },

    // Feedback relationships
    feedback_maker: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
    feedback_getter: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],

    // Relationships
    user_languages: [{ type: Schema.Types.ObjectId, ref: 'UserLanguages' }],
    languages: [{ type: Schema.Types.ObjectId, ref: 'Languages' }],
    user_interests: [{ type: Schema.Types.ObjectId, ref: 'UserInterests' }],
    interests: [{ type: Schema.Types.ObjectId, ref: 'Interest' }],
    //user_communities: [{ type: Schema.Types.ObjectId, ref: 'CommunityUsers' }],
    //communities: [{ type: Schema.Types.ObjectId, ref: 'Community' }],

    // Projects and Investments
    //projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    //investments: [{ type: Schema.Types.ObjectId, ref: 'Investment' }],

    // Messages
    //messages_sent: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    //messages_received: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

// Interest Schema
const interestsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    admin_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'UserInterests',
      },
    ],
  },
  { timestamps: true },
);

// Languages Schema
const languagesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    admin_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'UserLanguages',
      },
    ],
  },
  { timestamps: true },
);

// UserInterests Schema (for many-to-many relationship)
const userInterestsSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    interest_id: {
      type: Schema.Types.ObjectId,
      ref: 'Interest',
      required: true,
    },
  },
  { timestamps: true },
);

// UserLanguages Schema (for many-to-many relationship)
const userLanguagesSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    language_id: {
      type: Schema.Types.ObjectId,
      ref: 'Languages',
      required: true,
    },
  },
  { timestamps: true },
);

// Creating Models
const User = mongoose.model('User', userSchema);
const Interest = mongoose.model('Interest', interestsSchema);
const UserInterests = mongoose.model('UserInterests', userInterestsSchema);
const Languages = mongoose.model('Languages', languagesSchema);
const UserLanguages = mongoose.model('UserLanguages', userLanguagesSchema);

userSchema.plugin(uniqueValidator);

module.exports = {
  User,
  Interest,
  UserInterests,
  Languages,
  UserLanguages,
};

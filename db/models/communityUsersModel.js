const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const CommunityUsersSchema = new mongoose.Schema({
    
    visibility :{type:Boolean, default:true},

    created_at :{ type:Date , default: Date.now },
    updated_at :{ type:Date , default: Date.now },
    

   user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' , required: true  }],  // Reference to User
   community_name: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' , required: true  }],  // Reference to community
   
});

const CommunityUsers = mongoose.model('CommunityUsers', CommunityUsersSchema);
module.exports = CommunityUsers;
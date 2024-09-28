const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');



const CommunitySchema = new mongoose .Schema({
   name:{type:String , unique: true , maxlength:100 , default: uuidv4},
   
   created_at :{ type:Date , default: Date.now },
   updated_at :{ type:Date , default: Date.now  },
   
   description:{type:String , required: true},
   image:{type:String , required:false}, //optional field


   admin_id:{type:mongoose.Schema.Types.ObjectId, ref:"User", required :true},    //forigen key Reference to admin User
   users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommunityUsers'  }],  // Reference to CommunityUsers
   pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommunityPages'  }]   // Reference to CommunityPages
  
});



const Community = mongoose.model('Community', CommunitySchema);
module.exports = Community;




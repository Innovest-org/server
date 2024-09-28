const { required } = require('joi');
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');


const pageSchema = new mongoose.Schema({
    id: {type:String , default: uuidv4 , unique:true},
    title: {type:String ,  required: true,  maxlength: 500},
    content:{ type:String , required: true},
    location:{type:String , required:false},
    images_url: { type: [String],  /* Array of image URLs */  default: [] },
    page_url: {type: String, required: true},
    start_time: {type : Date, required: false  },   //optional field
    end_time: {type : Date, required: false  },   //optional field
    

    created_at :{ type:Date , default: Date.now },
    updated_at :{ type:Date , default: Date.now  },

    page_type: {
      type: String,
      enum:[' EVENT', ' INFORMATION', 'POST' , 'OTHER'],
    },


    admin_state: {
        type: String,
        enum:['APPROVER', ' REJECTOR', 'MAKER'],
        default: "APPROVER" 
      },

      page_state: {
        type: String,
        enum:['PENDING', 'APPROVED', ' REJECTED'],
        default:'Pending'
      },

    
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true} ,    //forigen key Reference to User
    admin_id:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},    //forigen key Reference to admin User
    community: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community'  }]   // Reference to CommunityPages
  });


  const Page = mongoose.model('Page', pageSchema);
  module.exports = Page;





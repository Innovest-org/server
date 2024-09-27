const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const CommunityPagesSchema = new mongoose.Schema({
    community_name:{type:String , default: uuidv4 , unique:true},

    created_at :{ type:Date , default: Date.now },
    updated_at :{ type:Date , default: Date.now  },

    visibility :{type:Boolean , default:true },

    page_id:{type:mongoose.Schema.Types.ObjectId, ref:"page", required:true} 

    
});

// Composite Key for community_name and page_id
CommunityPagesSchema.index({ community_name: 1, page_id: 1 }, { unique: true })  



const CommunityPages = mongoose.model('CommunityPages', CommunityPagesSchema);
module.exports = CommunityPages;
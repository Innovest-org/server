const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const likeSchema = new mongoose .Schema({
    like_id:{type:String,  unique: true  ,required:true , default: uuidv4},
    content:{type:String},

    created_at :{ type:Date , default: Date.now },

    user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' , required: true  }],  // Reference to User
    post_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' , required: true  }],  // Reference to post
   

});


const like = mongoose.model('like', likeSchema);
module.exports = like;
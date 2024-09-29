const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const commentSchema = new mongoose .Schema({
    comment_id:{type:String , default: uuidv4 ,required:true},
    content:{type:String},

    created_at :{ type:Date , default: Date.now },

    user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' , required: true  }],  // Reference to User
    post_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' , required: true  }],  // Reference to post
});


const comment = mongoose.model('comment', commentSchema);
module.exports = comment;
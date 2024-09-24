
const mongoose= require('mongoose');
const { v4: uuidv4 } = require('uuid');
const {Schema} = mongoose;


const notificationSchema = new mongoose.Schema({ 
  notification_id: {type:String , default:uuidv4 , unique:true},
  content:{type:String , required:true },
  type:{type:String  , required:true },
  read_status: {type:Boolean , required:true},

  created_at :{ type:Date , default: Date.now },
  updated_at :{ type:Date , default: Date.now  },

  
  user_id:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true} ,    //forigen key
})
 

const notification = mongoose.model('notification', notificationSchema)

module.exports = notification ;
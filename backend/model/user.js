const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:String,
    email:String,
    password:String
});
var UserData = mongoose.model('user', UserSchema);    
module.exports=UserData;
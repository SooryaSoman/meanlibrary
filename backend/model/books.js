const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookSchema = new Schema({
    title:String,
    author:String,
     price:Number,
     publisher:String
});
var BookData = mongoose.model('book', BookSchema);    
module.exports=BookData;
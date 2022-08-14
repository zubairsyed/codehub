const mongoose = require('mongoose');


console.log("connected to likes schema");

const likeSchema = new mongoose.Schema({
    // for user identification
    // type - user object id 
    // refPath - refpath of post or comment
    user: {
        type: mongoose.Schema.ObjectId
    },
    // likeable - the defines the object id of liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // onModel - chooses the type of object i.e post or comment
    // since its a dynamic reference
    // enum - makes strict that either post or comments object 
    // id will be taken
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
},{
    timeStamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;


const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
},
    { timestamps: true 
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

//  statics methods
// now we are storing the file at multer storage variable
// now adding the only 1 avatar at a time
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');

// when controller asks for the path a function needs to be there
// to handle the avatar path
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);
module.exports = User;

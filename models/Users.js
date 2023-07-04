const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    name:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    }

})

module.exports = mongoose.model('user', userSchema);
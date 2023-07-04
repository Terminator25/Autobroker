const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    requestToken:{
        type: String
    },

    accessToken:{
        type: String
    }

})

module.exports = mongoose.model('token', tokenSchema);
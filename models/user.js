const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },

    lastname: {
        type: String,
        maxlength:32,
        trim: true
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    phone: {
        type:Number,
        required: true,
        maxlength: 10
        //minlength: 10
    }

},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
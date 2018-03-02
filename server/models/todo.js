var mongoose = require('mongoose');
// create a Todo model
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,  // validator to say this must exist
        minlength: 1,
        trim: true // remove leading and trailing spaces
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    },
    _creator:{  // for private routes
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = {Todo};
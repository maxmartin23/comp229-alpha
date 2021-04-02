
let mongoose = require('mongoose');


let User = mongoose.Schema({

    username:  {
        type: String,
        default: '',
        trim:true,
        required: 'Username is required'
    }, 
    password:{
        type: String,
        default:'',
        trim:true,
        required: 'Password is required'
    },
    email: {
        type: String,
        default:'',
        trim:true,
        required: 'Email is required'
    },
    type:{
        type: String,
        default:'',
        trim:true,
        required: 'Type is required'
    }
},
{
    collection: "users"
});

module.exports = mongoose.model('User', User);
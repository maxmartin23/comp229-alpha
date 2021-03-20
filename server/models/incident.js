
let mongoose = require('mongoose');


let Incident = mongoose.Schema({

    number:  {
        type: String,
        default: '',
        trim:true,
        required: 'Number is required'
    }, 
    address:{
        type: String,
        default:'',
        trim:true,
        
    },
    description: {
        type: String,
        default:'',
        trim:true,
        required: 'Description is required'
    },
    priority:{
        type: String,
        default:'',
        trim:true,
    },
    status:{
        type: String,
        default: '',
        trim:true
    },
    customerInfo:{
        type: String,
        default: '',
        trim:true
    },
    narrative:{
        type: String,
        default: '',
        trim:true
    },
    resolution:{
        type: String,
        default: '',
        trim:true
    },
    createDate:{
        type: Date,
        default: Date.now(),
    }
},
{
    collection: "incidentLog"
});

module.exports = mongoose.model('Incident', Incident);
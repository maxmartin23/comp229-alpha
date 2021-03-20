
let mongoose = require('mongoose');


let Incident = mongoose.Schema({

    name:  {
        type: String,
        default: '',
        trim:true,
        required: 'Name is required'
    }, 
    address:{
        type: String,
        default:'',
        trim:true,
        
    },
    incidentDescription: {
        type: String,
        default:'',
        trim:true,
    },
    incidentPriority:{
        type: String,
        default:'',
        trim:true,
    },
    status:{
        type: String,
        default: '',
        trim:true
    }
},
{
    collection: "incidentLog"
});

module.exports = mongoose.model('Incident', Incident);
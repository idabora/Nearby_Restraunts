const mongoose = require('mongoose');

const restrauntSchema = new mongoose.Schema(
    {
        restrauntName: {
            type: String,
            required: true,
            index:true
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type:{
                type: String, 
                enum: ['Point'], 
                required: false,
                index:true,
                default:'Point'

            },
            coordinates:{
                type: [Number] ,
                required:false,
            },

            // type: "Point",
            // required: false
            // , coordinates: {
            //     type: [Number],
            //     required: false
            // }
        },
        rating: {
            type: [Number],
            required: true
        }
    }
);
module.exports = mongoose.model('Restraunt', restrauntSchema);
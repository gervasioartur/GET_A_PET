const mongosee = require('../database/conn')
const { Schema } = mongosee

const Pet = mongosee.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        avelible: {
            type: Boolean
        },
        user: Object,
        adopter: Object
    },

        { timestamps: true }
    )
)

module.exports = User
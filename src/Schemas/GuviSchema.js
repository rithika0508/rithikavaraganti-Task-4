const mongoose = require('mongoose')

const GuviSchema = mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required:true,
        unique: true
    },
    label: {
        type:String,
        trim:true,
        required: true
    },
    price: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim:true
    },
    featured: {
        type: Boolean
    }

})

GuviSchema.statics.removeId = async (requestBody) => {
    const guvi = requestBody
    delete guvi._id
    return guvi
}
GuviSchema.methods.toJSON = function() {
    const guvi = this
    const guviObj = guvi.toObject()
    delete guviObj.price
    delete guviObj.featured
    delete guviObj.__v
    delete guviObj.description
    return guviObj
}
const GuviModel = mongoose.model('Guvi', GuviSchema)

module.exports = GuviModel
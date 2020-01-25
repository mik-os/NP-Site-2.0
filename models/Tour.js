const mongoose = require('mongoose')
const tourSchema = mongoose.Schema({
    date:String,
    location:String,
    venue:String
});


const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour

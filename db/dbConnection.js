const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, () => {
    console.log('connected to db');
})
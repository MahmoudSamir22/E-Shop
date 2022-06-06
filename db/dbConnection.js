const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, () => {
    console.log(`Connected to db`);
})
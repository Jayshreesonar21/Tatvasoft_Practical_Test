const mongoose = require('mongoose');
const { dbUri } = require('../config')

exports.connect = async() => {
    try {
        const options =  {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        const connection = await mongoose.connect(dbUri, options);
        if (connection) console.log("Database connected successfully...");
    } catch(error) {
        console.log("Error while connecting to database...");
        console.log(error);
    }
}
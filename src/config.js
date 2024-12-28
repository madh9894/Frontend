const mongoose = require('mongoose');

// Replace the connection string with your MongoDB Atlas URI
const connect = mongoose.connect("mongodb+srv://moaaz9894:9894@mbts2.tax5v.mongodb.net/myDatabaseName?retryWrites=true&w=majority");

// Check database connection
connect
    .then(() => {
        console.log("Database Connected Successfully to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("Database Connection Failed", err);
    });

// Create Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Collection part
const UserCollection = mongoose.model("users", LoginSchema);

module.exports = UserCollection;

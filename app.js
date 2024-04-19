const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const MongoUrl = 'mongodb+srv://sachinjain:Sachin11567@cluster0.xmsrgbk.mongodb.net/?retryWrites=true&w=majority';
const cors = require("cors");
const bodyParser = require("body-parser");

const AuthKey = "1920d7372573818137d7c1d1b3b0c49f";
const port = 7000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let db;
MongoClient.connect(MongoUrl, (err, client) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    } else {
        db = client.db('restaurant');
        console.log("Server is connected to MongoDB");
    }
});

app.get('/', (req, res) => {
    res.send('Health OK');
});



app.listen(port, (err) => {
    if (err) {
        console.error("Error starting the server:", err);
        throw err;
    } else {
        console.log("Server is running on port", port);
    }
});





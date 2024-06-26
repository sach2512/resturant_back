const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require('dotenv').config();
const MongoUrl =process.env.MONGOURL||7000;
const cors = require("cors");
const bodyParser = require("body-parser");
const resturantrouter= require('./routes/resturant.route.js')
const userrouter=require('./routes/user.router.js')
const AuthKey = "1920d7372573818137d7c1d1b3b0c49f";
const port = 7000;
const app = express();
const { ObjectId } = require('mongodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//const controller=require('/controller/function.js')



MongoClient.connect(MongoUrl, (err, client) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    } else {
        db = client.db('resturant');
        console.log("Server is connected to MongoDB");
    }
});
// function controller(collectionname,query){
//     db.collection(collectionname).find(query).toArray((err,data)=>{
//         if (err) {
//             console.error('Error querying MongoDB:', err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }else{
//             res.send(data);
//         }
        
//     })
// }


app.get('/', (req, res) => {
    res.send('Health OK');
});




app.use('/resturant',resturantrouter);

app.use('/user',userrouter);
// get list of locations

app.get('/location',(req,res)=>{
    db.collection("locations").find().toArray((err,data)=>{
        if (err) {
            console.error('Error querying MongoDB:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    })
})



//list of all meals


app.get('/allmeals',(req,res)=>{
    db.collection("mealtypes").find().toArray((err,data)=>{
        if (err) {
            console.error('Error querying MongoDB:', err);
            res.status(500).send('Internal Server Error');
            return;
        }else{
            res.send(data);
        }
        
    })
    
})




app.listen(port, (err) => {
    if (err) {
        console.error("Error starting the server:", err);
        throw err;
    } else {
        console.log("Server is running on port", port);
    }
});





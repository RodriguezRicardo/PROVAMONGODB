var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ricardorodriguez:Rcy_kj0_p@nraboy-sample.bf8zs.mongodb.net/nraboy-sample?retryWrites=true&w=majority'

router.get('/borough', function(req, res, next) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getBorough);
    function getBorough(err) {
        if (err) console.log("Conessione al db non riuscita");
        else {
            const collection = client.db("sample_restaurants").collection("restaurants"); 
            collection.find({borough : "Brooklyn"}).limit(10).toArray(callBackQuery);
        }
    }
    function callBackQuery(err, result)  {
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }
});

router.get('/action', function (req, res, next) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getListMoviesAction);
    
    function getListMoviesAction(err) {
        if (err) console.log("Conessione al db non riuscita");
        else {
            const collection = client.db("sample_mflix").collection("movies"); 
            collection.find( {genres:{$in:["Action"]}} ).limit(10).toArray(callBackQuery);
        }
    }
    function callBackQuery(err, result)  {
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }
});

module.exports = router;


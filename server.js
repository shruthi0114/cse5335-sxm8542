// Dependencies
// -----------------------------------------------------
var express         = require('express');
var MongoClient = require('mongodb').MongoClient;
var port            = process.env.PORT || 8000;
var bodyParser      = require('body-parser');
var app             = express();






// Logging and Parsing
app.use(express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json


// Connect to the db
MongoClient.connect("mongodb://shruthi:shruthi@ds033076.mlab.com:33076/heroku_hvrpbkbq", function(err, db,res) {
    if (err) {
        return console.dir(err);
    }
    else{ console.log("db connected");}
    var collection=db.collection('restaurants');
    collection.find({}).toArray(function(err,result){
        if(err){
            res.send(err);

        }else if(result.length){
            console.log(result);
        }
    });




// --------------------------------------------------------
// Retrieve records for stores in the db according to given input
app.get('/restaurants', function(req, res){

     var collection=db.collection('restaurants');
    collection.find({}).toArray(function(err,result){
        if(err){
            res.send(err);

        }else if(result.length){
            console.log(result);
            res.json(result);
        }
    });
    /*var collection = db.collection('restaurants');

    collection.find({}).toArray(function(err, items) {

        res.json(items);
        console.log(items);

    });*/
});


});


// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);

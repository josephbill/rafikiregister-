
var express = require ('express');
var app = express();
var mongoose = require ('mongoose');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/contactlist');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("mongoose connection successful");});

var Schema = mongoose.Schema;

var contactlistSchema = new Schema({
    name: String,
    adm_number: Number,
    school: String,
    marks: Number ,
    Amount: Number
 


    

}, { versionKey: false, collection: 'contactlist'});










var Contact = mongoose.model('Contact', contactlistSchema);

app.get('/contactlist', function (req, res) {
  console.log('I received a get request');
    Contact.find({}, function (err, docs) {
    	console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist', function (req, res) {
	console.log(req.body);

		Contact(req.body).save(function (err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log('Saved : ', data ); 
				res.json(data);
			}
		});
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);

	Contact.findByIdAndRemove(id, function(err, data) {
    	if (err){
    		res.send(err);
    	} else {
    		res.json(data);
    	}
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);

	Contact.findById(id, function(err, data) {
    	if (err){
    		res.send(err);
    	} else {
    		res.json(data);
    	}
	});
});

app.put('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);

	Contact.findByIdAndUpdate(id, 
		{ $set: { name: req.body.name, 
			      adm_number: req.body.adm_number,
			      school: req.body.school, 
				  marks: req.body.marks,
				  Amount: req.body.Amount

				}
				}, function (err, doc) {
  		if (err) {
  			res.send(err);
  		} else {
  			res.json(doc);
  		}
	});
});

app.listen(5000);

console.log("Server is Running on port 5000");

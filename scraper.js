var express = require('express');
var Scraper = require ('images-scraper');

var app = express();
var google = new Scraper.Google(); 

app.get('/getImage', function (req, res) {
	console.log("Request:" + req.query.employer);
    google.list({
    	keyword: 'google logo',
   		num: 1,
   		detail: false,
   		nightmare: {
        	show: false
    	}
	})
	.then(function (result) {
    	console.log('first result from google', result);
    	res.send(result);
	}).catch(function(err) {
    	console.log('err', err);
	});
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})



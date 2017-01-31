var express = require('express');
var Scraper = require ('images-scraper');

var app = express();
//var google = new Scraper.Google(); 
var bing = new Scraper.Bing()

app.get('/getImage', function (req, res) {
	console.log("Request:" + req.query.employer);
  var searchString = req.query.employer + " logo";
  bing.list({
    keyword: searchString,
    num: 1,
    detail: false
  })
  .then(function (result) {
    imageUrl = result[0].url;
    console.log(result);
    res.send(imageUrl);
  }).catch(function(err) {
    console.log('err',err);
  });
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})



var express = require('express');
var async = require('async');
var Scraper = require ('images-scraper');

var app = express();
let bing = new Scraper.Bing();
app.get('/getImage', function (req, res) {
  employerList =  req.query.employerList;
  let calls = [];
  Object.keys(employerList).forEach(function(key) {
      calls.push(function(callback){
        bing.list({
        keyword: employerList[key] + " logo",
        num: 1,
        detail: false
      })
      .then(function (result) {
        console.log("Request:" + req.query.employerList); 
        imageUrl = result[0].url;
        console.log(result);
        callback(null, imageUrl);
      }).catch(function(err) {
        console.log('err',err);
        callback(err);
      });
      });
  });
  async.parallel(calls, function(err, result) {     
    res.send(result);
    if (err)
        return console.log(err);
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})



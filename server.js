var express = require('express');
var async = require('async');
var Scraper = require ('images-scraper');
var cors = require('cors')

var app = express();
app.use(cors())


let bing = new Scraper.Bing();

app.get('/getImage', function (req, res) {
  let counter = 0;
  employerList =  req.query.employerList;
  let calls = [];
  Object.keys(employerList).forEach(function(key) {
      calls.push(function(callback){
        bing.list({
        keyword: employerList[key] + " logo",
        num: 1,
        detail: true
      })
      .then(function (result) {
        console.log(employerList);
        console.log(result);
        imageUrl = result[0].url;
        //counter is a shared variable between 3 async tasks 
        //(assumes images are retrieved in the same order they are requested)
        let returnObject = {employer: employerList[counter++], url: imageUrl}
        callback(null, returnObject);
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

var server = app.listen(process.env.PORT || 8081, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
})



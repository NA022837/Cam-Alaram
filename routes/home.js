var express     = require('express'),
    router      = express.Router(),
    database    = require('./database.js');

module.exports.find =  function(req, res, next) {
    var times = 2,
        result = {},
        resultz = [];
    
    // Construct a new object of Records.
    function hourObject(count) {
        this.count = count;
        return this;
    }
    
    for(var i = 0;i < 6; i++) {
        if(i==5){times = 24;}
        
        function getCount(callback) {
            database.viewClients('cid1',times,function (err, results) {
                result = new hourObject(results);
                resultz.push(result);
                callback();
            });
            times = times + 2;
        }
        function setCount() {
            if(resultz.length == 6) {
                res.render('home', { data: resultz});
            }
        } getCount(setCount);
    }
};
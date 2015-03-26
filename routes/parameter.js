/** 
 *  This JS is responsible for getting all the distinct client paramters.
 *  It queries for CAMAlarms collections and fetches the data from it.
 * 
 *  @Author: NA022837
 */
var express     = require('express'),
    router      = express.Router(),
    database    = require('./database.js');

module.exports.find = function(req, res, next) {
    var result = {},resultz = [],paramsList;
    
    // Construct a new object of Records.
    function paramObject(params,occur,client,time) {
        this.Param = params;
        this.Occur = occur;
        this.Client = client;
        this.Time   = time;
        return this;
    }
    
    database.viewDisAlarams(req.params.client,req.params.time,function (err, results) {
        paramsList = results;

        if (paramsList.length > 0) {            
            function getClientsAlarms(callback){
                for(var i in paramsList) {
                    database.viewParams(paramsList[i], req.params.client, req.params.time, function (err, results) {
                        result = new paramObject(results[0].parameter ,results.length,req.params.client,req.params.time);
                        resultz.push(result);
                        callback();
                    });
                }
            }
        } else {
            resultz = [];
        }
        function printClientAlarms() {
            // Render page only once at last.
            if(resultz.length == paramsList.length){
                res.render('params', { data: resultz});
            }
        }
        getClientsAlarms(printClientAlarms);
    });
};
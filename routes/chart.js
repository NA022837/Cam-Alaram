/** 
 *  This JS is responsible for getting all the distinct client alert,
 *  and show a bar chart of alert.
 * 
 *  @Author: NA022837
 */
var express     = require('express'),
    router      = express.Router(),
    database    = require('./database.js');

module.exports.find = function(req, res, next) {
    var clientsList,result = {},resultz = [];
        
    // Construct a new object of client and Alaram.
    function barChartObject(client, alarams, unit) {
        this.client  = client;
        this.Alarams = alarams;
        return this;
    }
    
    database.viewClients('cid1',req.params.time,function (err, results) {
        clientsList = results;
        
        if (clientsList.length > 0) {
            function getClientsAlarms(callback){
                for(var i in clientsList) {
                    database.viewClientAlarmsCounts(clientsList[i],req.params.time, function (err, results) {
                        result = new barChartObject(results[0].cid1,results.length);
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
            if(resultz.length == clientsList.length){
                res.render('chart', { data: resultz});
            }
        }
        getClientsAlarms(printClientAlarms);
    });
    
};
/** 
 *  This JS is responsible for getting all the distinct client alerts.
 *  It queries for CAMAlarms collections and fetches the data from it.
 * 
 *  @Author: NA022837
 */
var express     = require('express'),
    router      = express.Router(),
    database    = require('./database.js'),
    moment      = require('moment');

module.exports.find = function(req, res, next) {
    var clientsList,result = {},resultz = [],timestamp=2;
    if(req.params.time){
        timestamp = req.params.time;
    }
    
    
    // Construct a new object of client and Alaram.
    function clientAlarms(client, alarams, unit, clientname, parameter) {
        this.Client     = client;
        this.Alarams    = alarams;
        this.Unit       = unit;
        this.ClientName = clientname;
        this.Parameter  = parameter;
        return this;
    }
    
    database.viewClients('cid1',timestamp,function (err, results) {
        clientsList = results;
        //console.log(clientsList);
        
        if (clientsList.length > 0) {
            function getClientsAlarms(callback){
                for(var i in clientsList) {
                    database.viewClientAlarmsCounts(clientsList[i],timestamp,function(err,results) {
                        result = new clientAlarms('<a href="/Clients/'+results[0].cid1+'/'+timestamp+'">'+results[0].cid1+'</a>',
                                             results.length,timestamp,results[0].clientNameFull,results[0].parameter);
                             resultz.push(result);
                             callback();
                    });
                }
            }
        } else {
            resultz = [];
        }
        function printClientAlarms() {
           //console.log(resultz);
            
            if(resultz.length == clientsList.length){
                // Render page only once at last.
                res.render('alarms', { data: resultz});
            }
        }
        getClientsAlarms(printClientAlarms);
    });
};
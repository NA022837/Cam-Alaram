/** 
 *  This JS is responsible for getting all client alerts.
 *  It queries for CAMAlarms collections and fetches the data from it.
 * 
 *  @Author: NA022837
 */
var express     = require('express'),
    router      = express.Router(),
    database    = require('./database.js'),
    moment      = require('moment');

module.exports.find = function(req, res, next) {
    var alarmList,result = {},resultz = [];
        
    // Construct a new object of client and Alaram.
    function barChartObject(monthday, count) {
        this.date = monthday;
        this.value = count;
        return this;
    }
        
    function getClientsAlarms(callback){
        database.viewClientAlarmsCountsForBarChart("cid1",req.params.time, function (err, results) {
            alarmList = results;
            console.log(alarmList.length);
            for(var i in alarmList) {
                switch (alarmList[i]._id.month) {
                    case 1:
                         month = "JAN";
                         break;
                    case 2:
                         month = "FEB";
                         break;
                    case 3:
                         month = "MAR";
                         break;
                    case 4:
                         month = "APR";
                         break;
                    case 5:
                         month = "MAY";
                         break;
                    case 6:
                         month = "JUN";
                         break;
                    case 7:
                         month = "JUL";
                         break;
                    case 8:
                         month = "AUG";
                         break;
                    case 9:
                         month = "SEP";
                         break;
                    case 10:
                         month = "OCT";
                         break;
                    case 11:
                         month = "NOV";
                         break;
                    case 12:
                         month = "DEC";
                         break;
                }
                //console.log(alarmList[i]._id.month+'--'+alarmList[i]._id.day);
                result = new barChartObject(month+' '+alarmList[i]._id.day, alarmList[i].count);
                resultz.push(result);
            }
            callback();
        });
    }
    
    function printClientAlarms() {
        // Render page only once at last.
        //if(resultz.length == alarmList.length){
            console.log(resultz);
           res.render('clientChart', { data: resultz});
       // }
    }
    
    getClientsAlarms(printClientAlarms);
};
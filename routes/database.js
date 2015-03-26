/** 
 *  This JS contains set of queries to fetch data from CAMAlarms collection.
 * 
 *  @Author: NA022837
 */
var config          = require('./config.js'),
    mongoose        = require('mongoose'),
    moment          = require('moment-timezone'),
    startDateTime,endDateTime,clients,cacheClients;

// Mongo DB connection.
var db      = mongoose.createConnection('mongodb://cnwx207:27017/cam'),
    clients = db.collection('CAMAlarms');

/** 
 *  Get the distcinct clients.
 * 
 *  @Parameters
 *  query : collection parameter to find distict field
 *  unit : Time frame
 *  callback : callback to the function.
 */
module.exports.viewClients = function (query,unit, callback) {
    startDateTime   = moment().utc().format(),
    endDateTime     = moment().utc().subtract(unit,'hours').format();
    
    // Get the distinct client.
    clients.distinct(query, {id:{$gt:0},inTimeDate: { $gt:new Date(endDateTime), $lt:new Date(startDateTime) } } , function(err,results) {
        if (err) {
            console.log('Error connecting to collection..');
            return callback(err, null);
        }
        callback(null,results);
    });
};

/** 
 *  Get the distcinct Parameter.
 * 
 *  @Parameters
 *  client : Client name
 *  unit : Time frame
 *  callback : callback to the function.
 */
module.exports.viewDisAlarams = function (parameter,unit,callback) {
    startDateTime   = moment().utc().format(),
    endDateTime     = moment().utc().subtract(unit,'hours').format();
    
    // Get the distinct client.
    clients.distinct('parameter',{id:{$gt:0},cid1:parameter,inTimeDate:{ $gt:new Date(endDateTime), $lt:new Date(startDateTime) } } , function(err,results) {
        if (err) {
            console.log('Error connecting to collection..');
            return callback(err, null);
        }
        callback(null,results);
    });
};

/** 
 *  Get the alaram count for each distinct client.
 * 
 *  @Parameters
 *  query : Client name
 *  unit : Time frame
 *  callback : callback to the function.
 */
module.exports.viewClientAlarmsCounts = function (query,unit,callback) {
    startDateTime   = moment().utc().format(),
    endDateTime     = moment().utc().subtract(unit,'hours').format();
    
    // Get the count of alarms for each client.
    db.collection('CAMAlarms').aggregate([ { $match : { "cid1" :query, "inTimeDate": {"$gte": new Date(endDateTime),"$lte": new Date(startDateTime)}}},
                                           { $project :{ cid1 : 1 ,parameter : 1, clientNameFull: 1 }}],function(err,results) {
        if (err) {
            console.log('Error connecting to collection..');
            return callback(err, null);
        }
        callback(null,results);
    });
};

/** 
 *  Get the count of alarms for each client.
 * 
 *  @Parameters
 *  params : Paramert name
 *  client : Client name
 *  unit : Time frame
 *  callback : callback to the function.
 */
module.exports.viewParams = function (params,client,unit, callback) {
    startDateTime   = moment().utc().format(),
    endDateTime     = moment().utc().subtract(unit,'hours').format();
 
    db.collection('CAMAlarms').aggregate([{"$match": {"cid1":client,"parameter":params,"inTimeDate": 
                                          {"$gte": new Date(endDateTime),"$lte": new Date(startDateTime)}}},
                                          { $project :{parameter : 1 }}], function(err,results) {
        if (err) {
            console.log('Error connecting to collection..');
            return callback(err, null);
        }
        callback(null,results);
    });
};


/** 
 *  Get the alaram occurrence of the client.
 * 
 *  @Parameters
 *  query : Client name
 *  unit : Time frame
 *  callback : callback to the function.
 */
module.exports.viewClientAlarmsCountsForBarChart = function (client,unit,callback) {
    startDateTime   = moment().utc().format(),
    endDateTime     = moment().utc().subtract(unit,'month').format();
    console.log(endDateTime);
    db.collection('CAMAlarms').aggregate(([
    // Get only records created in the last 30 days from today.
    {$match:{
          "inTimeDate":{"$gte": new Date(endDateTime)}
    }}, 
    // Get the year, month and day from the createdTimeStamp
    {$project:{
          "year":{$year:"$inTimeDate"}, 
          "month":{$month:"$inTimeDate"}, 
          "day": {$dayOfMonth:"$inTimeDate"}
    }}, 
    // Group by year, month and day and get the count
    {$group:{
          _id:{month:"$month", day:"$day"}, 
          "count":{$sum:1}
    }},{$sort: {_id: 1}}]),function(err,results) {
        if (err) {
            console.log('Error connecting to collection..');
            return callback(err, null);
        }
        callback(null,results);
    });
};
                                         
                                         
                                         
                                         
                                         
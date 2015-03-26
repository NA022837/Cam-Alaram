var config = {}
  , mongoUri = require('mongodb-uri');

config.mongo = {};
config.mongo.uri = 'mongodb://cnwx207:27017/?replicaSet=rs0';
//config.mongo.database = 'camAlaramDetails';
config.mongo.database = 'cam';
config.mongo.collections = {};
config.mongo.collections.services = 'CAMAlarms';
//config.mongo.collections.services = 'camClients';
//config.mongo.collections.services1 = 'clientAlarams';

/**
 * @description Returns formatted Uri string from
 *              options specified in this file.
 * @return String uri
 */
config.mongo.getUri = function () {
    var uri = mongoUri.parse(config.mongo.uri);
    uri.database = config.mongo.database;
    return mongoUri.format(uri);
};

module.exports = config;
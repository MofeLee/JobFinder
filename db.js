var mongoose = require("mongoose");
var Promise = require('bluebird');

exports.connect = Promise.promisify(mongoose.connect, mongoose);
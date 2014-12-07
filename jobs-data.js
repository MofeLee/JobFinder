var mongoose = require("mongoose");
var Promise = require('bluebird');

var Job = mongoose.model('Job');

var findJobs = function(query) {
    return Promise.cast(Job.find(query).exec());
};

exports.findJobs = findJobs;

var createJob = Promise.promisify(Job.create, Job);

exports.seedJobs = function() {
    return findJobs({}).then(function(collection){
        if (collection.length === 0) {
            return Promise.map(jobs, function(job){
                return createJob(job);
            });
        }
    });
};

var jobs = [
    { title: 'Cook', description: 'You will be making bagels' },
    { title: 'Waiter', description: 'You will be putting food on peoples table' },
    { title: 'Programmer', description: 'You will be mindless typing things.' },
    { title: 'Axe Maker', description: 'We need many axes made... so many...' }
];
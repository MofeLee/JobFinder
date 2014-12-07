var expect = require("chai").expect;
var mongoose = require("mongoose");
var jobModel = require('../../models/Job');
var jobsData = require('../../jobs-data');
var Promise = require('bluebird');
var db = require('../../db');

function resetJobs() {
    return new Promise(function(resolve, reject){
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe("getting jobs in the data layer", function(){

    var jobs;

    before(function(done){
        db.connect('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function (collection) {
                jobs = collection;
                done();
            });
    });

    after(function(){
        mongoose.connection.close();
    });

    it("should never be empty since jobs are seeded", function(){
        expect(jobs.length).to.be.at.least(1);
    });

    it("should have a job with a title", function(){
        expect(jobs[0].title).to.not.be.empty;
    });

    it("should have a job with a description", function(){
        expect(jobs[0].description).to.not.be.empty;
    });
});

describe("saving jobs in the data layer", function(){

    var job = { title: 'Tester', description: 'You will be making sure shit works' };
    var jobs;
    //var savedJob;

    before(function(done){
        db.connect('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(function() { return jobsData.saveJob(job)})
            .then(jobsData.findJobs)
            .then(function setJobs(collection){
                jobs = collection;
                done();
            });
    });

    after(function(){
        mongoose.connection.close();
    });

    it("should have one job after saving one job", function () {
        expect(jobs).to.have.length(1);
    });

//    it("should create a new job if it doesn't exist", function(done){
//        db.connect('mongodb://localhost/jobfinder')
//            .then(function(){ jobsData.mCreateJob(newJob) })
//            .then(function(savedJob){
//                console.log('savedJob is ');
//                console.dir(savedJob);
//                expect(savedJob).to.deep.equal(newJob);
//                done();
//            });
//    });
//
//    it("should update a job if it already exists", function(){
//
//    });

});
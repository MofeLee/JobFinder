var express = require('express');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data');
var db = require('./db');

var app = express();
app.set('views', __dirname);
app.set('view engine','jade');
app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
    jobsData.findJobs().then(function(collection){
        res.send(collection);
    });
});

app.get('*', function(req, res){
    res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder');
db.connect('mongodb://psdev:psdev@ds061360.mongolab.com:61360/jobfinder1')
    .then(function() {
        console.log('connected to mongodb successfully!');
        jobModel.seedJobs();
    }
);

app.listen(process.env.PORT, process.env.IP);
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Jobs = mongoose.model('Jobs');
const Notes = mongoose.model('Notes');


exports.getSavedJobs = (user, organizeBy, cb) => {
    if(organizeBy == 'Status'){
        Jobs.find({user: user}, null, {sort: {status: 1}}).populate('notes').exec((err, jobs) => {
            if (err) return cb(err, null);
            return cb(null, jobs);
        });
    } else if (organizeBy == 'Title'){
        Jobs.find({user: user}, null, {sort: {title: 1}}).populate('notes').exec((err, jobs) => {
            if (err) return cb(err, null);
            return cb(null, jobs);
        });
    } else {
        Jobs.find({user: user}, null, {sort: {date: -1}}).populate('notes').exec((err, jobs) => {
            if (err) return cb(err, null);
            return cb(null, jobs);
        });
    }
}

exports.addJob = (jobInfo, user, cb) => {
    let {source, jobTitle, company, detailUrl, location, status} = jobInfo;
    console.log(status);
    Jobs.findOne({link: detailUrl, user: user}, (err, job) => {
        if (err) return cb(err);
        if (job) {
            console.log('Job already saved');
            return cb(null);
        } else {
            let notes = new Notes();
            let saveJob = new Jobs({
                title: jobTitle,
                link: detailUrl,
                status,
                company,
                location,
                source,
                user,
                notes: notes._id
            });

            saveJob.save((err) => {
                if (err) return cb(err);
                notes.job = saveJob._id;
                notes.save((err) => {
                    if (err) return cb(err);
                    return cb(null);
                });
            });
        }
    });
}

exports.deleteJob = (jobId, cb) => {
    Jobs.find({_id: jobId}).remove((err) => {
        if (err) return cb(err);
        return cb(null);
    })
}
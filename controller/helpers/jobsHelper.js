const mongoose = require('mongoose');
const User = mongoose.model('User');
const Jobs = mongoose.model('Jobs');
const Notes = mongoose.model('Notes');


exports.getSavedJobs = (user, organizeBy, page, cb) => {
    // console.log(`Being organized by ${organizeBy}`);
    let skipPages;
    if (page > 1) {
        skipPages = page * 4;
    } else {
        skipPages = 0;
    }
    switch (organizeBy) {
        case "Status": {
            Jobs.find({user: user}, null, {
                sort: {status: 1},
                limit: 50,
            }).populate('notes').exec((err, jobs) => {
                if (err) return cb(err, null);
                if (jobs.length < 5) {
                    jobs.morePages = false;
                    return cb(null, jobs);
                } else {
                    jobs.pop();
                    jobs.morePages = true;
                    return cb(null, jobs);
                }
            });
            break;
        }
        case "Title": {
            Jobs.find({user: user}, null, {
                sort: {title: 1},
                limit: 50,
            }).populate('notes').exec((err, jobs) => {
                if (err) return cb(err, null);
                if (jobs.length < 5) {
                    jobs.morePages = false;
                    return cb(null, jobs);
                } else {
                    jobs.pop();
                    jobs.morePages = true;
                    return cb(null, jobs);
                }
            });
            break;
        }
        case "Date": {
            Jobs.find({user: user}, null, {
                sort: {date: -1},
                limit: 50,
            }).populate('notes').exec((err, jobs) => {
                if (err) return cb(err, null);
                console.log(jobs.length)
                if (jobs.length < 5) {
                    jobs.morePages = false;
                    return cb(null, jobs);
                } else {
                    jobs.pop();
                    jobs.morePages = true;
                    return cb(null, jobs);
                }
            });
            break;
        }
        default: {
            Jobs.find({user: user}, null, {
                sort: {date: -1},
                limit: 50,
            }).populate('notes').exec((err, jobs) => {
                if (err) return cb(err, null);
                if (jobs.length < 5) {
                    jobs.morePages = false;
                    return cb(null, jobs);
                } else {
                    jobs.pop();
                    jobs.morePages = true;
                    return cb(null, jobs);
                }
            });
        }
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
                notes: notes._id,
                status,
                company,
                location,
                source,
                user
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
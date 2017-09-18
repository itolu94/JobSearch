const mongoose = require('mongoose');
const User = mongoose.model('User');
const Jobs = mongoose.model('Jobs');
const Notes = mongoose.model('Notes');



exports.getSavedJobs = (user, cb) => {
  Jobs.find({user:user}, null, {sort: {date: -1}}).populate('notes').exec((err, jobs) => {
    if(err) return cb(err, null);
    // console.log(jobs);
    return cb(null, jobs);
  });
  // Jobs.find({users: {$in: [user]}},null, {sort:{date: -1}}, (err, jobs)=>{
  //   if(err) {
  //     return  cb(err, null);
  //   }
  //     Notes.findOne({user: user}, (err, notes) => {
  //     if(notes){
  //       let savedJobs = {
  //         jobs: jobs,
  //         notes: notes
  //       }
  //       return cb(null, savedJobs);			
  //     } else {
  //      let savedJobs = {
  //         jobs, 
  //         notes: [{}]
  //      }
  //       return  cb(null, jobs);
  //     }
  //   })
  // })
}

exports.addJob = (jobInfo, user, cb) => {
  let {source, jobTitle, company, detailUrl, location} = jobInfo;
  Jobs.findOne({link: detailUrl, user: user}, (err, job) =>{
    if (err) return cb(err);
		if(job) {
        console.log('Job already saved');
        return cb(null);
      // User.findOneAndUpdate({_id: user}, {$addToSet: {jobs: job._id}}, (err, doc) => {
      //   if(err) return cb(err);
      //   return(null);
      // })
		} else {
      let notes = new Notes();
			let saveJob = new Jobs({
				title: jobTitle,
        link: detailUrl,
				status: 'Applied',
				company,
				location, 
        source, 
        user,
        notes: notes._id
      });

			saveJob.save((err) =>{
        if(err) return cb(err);	
        notes.job = saveJob._id;
        notes.save((err) => {
          if(err) return cb(err);
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
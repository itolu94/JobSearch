const mongoose = require('mongoose');
const Jobs = mongoose.model('Jobs');
const Notes = mongoose.model('Notes');



exports.getSavedJobs = (user, cb) => {
  Jobs.find({users: {$in: [user]}},null, {sort:{date: -1}}, (err, jobs)=>{
    if(err) {
      return  cb(err, null);
    }
      Notes.findOne({user: user}, (err, notes) => {
      if(notes){
        let savedJobs = {
          jobs: jobs,
          notes: notes
        }
        return cb(null, savedJobs);			
      } else {
        return  cb(null, jobs);
      }
    })
  })
}

exports.addJob = (jobInfo, user, cb) => {
  let {source, jobTitle, company, detailUrl, location} = jobInfo;
  Jobs.findOne({link: detailUrl}, (err, job) =>{
    if (err) return cb(err);
    // checks if the job has already beens saved
		if(job) {
      // checks if users id is already associated with the job
			if(job.users.includes(user)){
				return cb(null);	
			}
			else{
        //add users id to the job
				Jobs.update({link: detailUrl}, {$addToSet: {users: user}}, (err, doc) =>{
					if(err) return cb(err);
					return cb(null);
				});
      }
      // create and save new Jobs model 
		} else {
			let saveJob = new Jobs({
				title: jobTitle,
        link: detailUrl,
        users: [user],
				status: 'Applied',
				company,
				location, 
				source, 
			});
			saveJob.save((err, doc) =>{
				if(err) return cb(err);					
        return cb(null);
			});
		}	
	});
}

exports.deleteJob = (jobId, cb) => {
  		Jobs.find({_id: jobId}).remove((err, results) => {
			if (err) return cb(err);
			return cb(null);
		})
}
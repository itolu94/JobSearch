const mongoose = require('mongoose');
const User = mongoose.model('User');
const Jobs = mongoose.model('Jobs');
const Notes = mongoose.model('Notes');
const listings = require('./../listingsHelper.js');
const jobsHelper = require ('./../jobsHelper');
const notesHelper = require ('./../notesHelper');


module.exports = (app, passport) => {
  app.get('/api/dice', (req, resp) => {
      listings.getDice(req.query, (data) =>{
        resp.send(data);
      });
  });

  app.get('/api/cyber-coders', (req, resp) => {
	  listings.getCyberCoders(req.query, (data) => {
      // console.log(data);
		  resp.send(data);
  	});
  });

  // app.get('/api/monster', (req, resp)=> {
  //   listings.getMonser(req, (data)=> {
  //     console.log(data);
  //   })
  // })

  app.get('/api/zip-recruiter', (req, resp) => {
    listings.getZipRecruiter(req.query, (data) => {
      // console.log(data)
      resp.send(data);
    });
  });

  app.get('/api/saved-jobs', (req, resp) => {
      console.log(req.query);
      jobsHelper.getSavedJobs(req.user, req.query.organizeBy || "Data", (err, data) =>{
      if(err) {
        console.log(err);
        resp.json({
          status: 'err',
          err
        });
      }
      resp.json({status: data});
    });
  });

  app.post('/api/add-job', (req, resp) => {
    jobsHelper.addJob(req.body, req.user, (err) => {
      if(err) {
        console.log(err);
        resp.json({status: false});
      }
      resp.json({status: true});
    });
  });
  
	app.delete('/api/delete-job' , (req, resp) =>{
    jobsHelper.deleteJob(req.query.jobId, (err) =>{
      if(err) {
        console.log(err);
        resp.json({status: false});
      }
      resp.json({status: true});
    })
  })

	app.delete('/api/delete-jobs-note', (req, resp) => {
    notesHelper.deleteNote(req.query, req.user, (err) => {
      if(err) {
        console.log(err);
        resp.json({status: false});
      }
      resp.json({status: true});
    });
	});



  
  app.put('/api/notes', (req, resp) => {
    notesHelper.addNote(req.body, req.user, (err) => {
      if(err) {
        console.log(err);
        resp.json({status: false});
      }
      resp.json({status: true});
    });
  });


  //TODO, only return users personal information(Name, preference, etc.)
  app.get('/api/user-info', (req, resp) => {
  User.findById(req.user)
    .populate('jobs', 'notes')
    .exec((err, doc) => {
      if (err) console.log(err);
      console.log('user-info return: ')
      console.log(doc);
      resp.send(doc);
    })
  });

	app.put('/api/edit-job', (req, resp) => {
		let data = req.body
		console.log(data);
		Jobs.update({link: data.link}, {$set: data}, (err, result) => {
			if (err) console.log(err);
			console.log(result);
		})
		resp.send('Recieved');
    });
}
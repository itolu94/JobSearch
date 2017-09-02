
const Jobs = require('../model/jobs.js');
const axios =  require('axios');
const listings = require('./listings.js');
const helpers = require('./helpers.js');
const path = require('path');

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
	  console.log(req.user)
	  if(req.user) {
		  console.log(req.user)
		  res.sendFile(path.resolve(__dirname + '/../public/app.html'));
	  } else {	
	  res.sendFile(path.resolve(__dirname + '/../public/login.html'));
	  }
  });

  app.post('/login',
    passport.authenticate('signin', {
      failureRedirect: '/',
    }),
    (req, res) => {
      return res.redirect('/');
    });
  app.get('/signup', (req, res) => {
	  res.sendFile(path.resolve(__dirname + '/../public/signup.html'));
  });


   app.post('/signup', (req, resp) => {
	let data = req.body;
	console.log(req.body)
    helpers.createAccount(data, (status) => {
		console.log(status);
      if (status) {
        resp.redirect('/');
      } else {
        resp.redirect('/signup');
      }
    });
  })
  app.get('/api/dice/:title/:city/:state/:page', (req, resp) => {
	  listings.getDice(req, (data) =>{
		  resp.send(data);
	  })
  })

  app.get('/api/cyber-coders/:title/:city/:state/:page', (req, resp) => {
	  listings.getCyberCoders(req, (data) => {
		  resp.send(data);
  	})
})

  app.get('/api/saved-jobs', (req, resp) => {
	  Jobs.find({},null, {sort:{date: -1}}, (err, doc)=>{
	  	if(err) console.log(err) 
		  resp.json(doc)
	  })
  });

	app.post('/api/add-job', (req, resp) => {
		// console.log(req.body.params);
		let {title, company, location, link, status, source} = req.body.params;
		var saveJob = new Jobs ({
		  title,
		  company,
		  link,
		  location,
		  status
	});
	saveJob.save((err, doc)=> {
		if(err) {
			console.log(err)
			resp.send({status: 'failed'});
		}; 
		console.log('Was successful')
		resp.send({status: 'completed'});
	});
	})


	app.delete('/api/delete-job' , (req, resp) =>{
		let {jobId} =  req.query
		Jobs.find({_id: jobId}).remove((err, results) => {
			if (err) console.log(err);
			resp.send({status: 'deleted'});
		})
	})

	app.delete('/api/delete-jobs-note', (req, resp) => {
		let {_id, note} = req.query
		Jobs.update({_id}, {$pullAll: {notes: note}}, (err, result) =>{
			if (err) console.log(err);
			console.log(result);
		})
		resp.send('data');
	})

  app.post('/api', (req, resp) => {
	var saveJob = new Jobs ({
		title: req.body.jobTitle,
		company: req.body.company,
		link: req.body.detailUrl,
		location: req.body.location,
		status: 'Applied'
	});
	saveJob.save((err, doc)=> {
		if(err) {
			console.log(err)
			resp.send({status: 'failed'});
		}; 
		res.send({status: 'completed'});
	});
  });

  
  app.put('/api/notes', (req, res) => {
	Jobs.update({_id: req.body.id}, {$addToSet: {notes: req.body.note}}, function(err, doc){
    if (err) console.log(err);
	});
	

	})
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
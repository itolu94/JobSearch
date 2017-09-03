
const mongoose = require('mongoose');
const Jobs = mongoose.model('Jobs');
const Notes = mongoose.model('Notes');
const axios =  require('axios');
const listings = require('./listings.js');
const helpers = require('./helpers.js');
const path = require('path');

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
	  if(req.user) {
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
	  Jobs.find({users: {$in: [req.user]}},null, {sort:{date: -1}}, (err, doc)=>{
			if(err) console.log(err) 
				Notes.findOne({user: req.user}, (err, notes) => {
					if(notes){
						let savedJobs = {jobs: doc,
						notes: notes}
						doc.notes = notes;
						// console.log(doc);
						resp.json(savedJobs);			
					} else {
						resp.json(doc);
					}
				})
	  })
  });

	app.post('/api/add-job', (req, resp) => {
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
		let {_id, note, index} = req.query
		// console.log(req.query)
		Notes.findOne({user: req.user}, (err, doc) => {
			if(err) console.log(err);
			// console.log(doc);
			// console.log (doc.notes[index].notes.slice(note,1));
			console.log(doc.notes[index].notes);
			doc.notes[index].notes.splice(note, 1);
			doc.save((err, result) =>{
				if (err) console.log(err);
				// console.log(result);
   			resp.send("YOU DID IT")			
			})
		})
		//update to work with Notes.update
		// Notes.update({user: req.user}, {
		// 	$pullAll: {
		// 		notes:  {
		// 			jobReference: _id, 
		// 		}

		// 		}
		// }
		// 			[{notes: note}]}, (err, result) =>{
		// 	if (err) console.log(err);
		// 	console.log(result);
		// })
	})

  app.post('/api', (req, resp) => {
	let {source, jobTitle, company, detailUrl, location} = req.body;
	Jobs.findOne({link: detailUrl}, (err, result) =>{
		if (err) console.log(err);
		if(result) {
			if(result.users.includes(req.user)){
				resp.send(result);	
			}
			else{
				Jobs.update({link: detailUrl}, {$addToSet: {users: req.user}}, (err, doc) =>{
					if(err) console.log(err);
					console.log(doc);
					resp.send(doc);	
				});
			}
		} else {
			let saveJob = new Jobs({
				title: jobTitle,
				link: detailUrl,
				status: 'Applied',
				users: [req.user],
				company,
				location, 
				source, 
			})
			saveJob.save((err, doc) =>{
				if(err) {
					console.log(err);
				  resp.send({status: 'failed'});					
				}	
				console.log(doc);
				resp.send({status: 'completed'});
			})
		}	
	});

	})

  
  app.put('/api/notes', (req, res) => {
	Notes.findOne({user: req.user}, (err, results) => {
		if (err) console.log(err);

		if (results){
			let index;
			let found = false;
			for(let i = 0; i < results.notes.length; i++) {
				if(results.notes[i].jobReference === req.body.id){
					index = i;
					found = true;
					break;
				}
			}
			if (found){
			console.log('Note Found');					
			results.notes[index].notes.push(req.body.note)
			console.log(results.notes[index].notes);
			results.save((err, doc) => {
				if (err) console.log(err);
				res.send('Note Found');
			});
			}
			else {
				let data = {
					jobReference: req.body.id,
					notes: [req.body.note]
				}
			console.log('Data added to user note document');							
				results.notes.push(data);
				results.save((err, doc) =>{
					if (err) console.log(err);
					console.log(doc);
					res.send('added');
				});
			}
		} else {
			console.log('note object generated for user');						
			let newNotes = new Notes({
				notes: [{
					jobReference: req.body.id,
					notes: [req.body.note]
				}],
				user: req.user
			});
			newNotes.save((err, doc) => {
				if (err) console.log(err);
			  res.send('Note Created');
			});	
		}
	})
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
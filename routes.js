
const Jobs = require('./modal/jobs.js');
const axios =  require('axios');
const listings = require('./controller/listings.js');

module.exports = (app) => {
  app.get('/', (req, res) => {
	res.sendFile(__dirname + './public/index.html')
  });


  app.get('/api/dice/:title/:city/:state/:page', (req, res)=> {
	listings.getDice(req, (data) =>{
		res.send(data);
	})
  })

  app.get('/api/cyber-coders/:title/:city/:state/:page', (req, res) => {
	listings.getCyberCoders(req, (data) => {
		res.send(data);
	})
})

  app.get('/api', (req, res) => {
	Jobs.find({},null, {sort:{date: -1}}, (err, doc)=>{
		if(err) console.log(err) 
		res.json(doc)
	})
  });

	app.delete('/api/delete-job' , (req, resp) =>{
		let {jobId} =  req.query
		Jobs.find({_id: jobId}).remove((err, results) => {
			if (err) console.log(err);
			console.log(results)
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

  app.post('/api', (req, res) => {
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
			res.send({status: 'failed'});
		}; 
		res.send({status: 'completed'});
	});
  });

  
  app.put('/api/notes', (req, res) => {
	Jobs.update({_id: req.body.id}, {$addToSet: {notes: req.body.note}}, function(err, doc){
    if (err) console.log(err);
  })  
	res.send({status: 'ok'});
  })
}
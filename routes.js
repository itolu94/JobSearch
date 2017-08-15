
const Jobs = require('./modal/jobs.js');

module.exports = (app) => {
app.get('/', (req, res) => {
	res.sendFile(__dirname + './public/index.html')
});



app.get('/api', (req, res) => {
	Jobs.find({}, (err, doc)=>{
		if(err) console.log(err) 
		res.json(doc)
	})
});


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
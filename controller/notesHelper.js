const mongoose = require('mongoose');
const Jobs = mongoose.model('Jobs');
const Notes = mongoose.model('Notes');


exports.deleteNote = (noteInfo, user, cb) => {
  let {_id, index} = noteInfo
  Notes.findOne({job: _id}, (err, doc) => {
		if(err) return(err);
		// console.log(doc);
		doc.notes.splice(index, 1);
		doc.save((err, result) =>{
      if (err) return cb(err);
        return cb(null);
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
}


exports.addNote = (noteInfo, user, cb) => {
	let {id, note} = noteInfo;
	Notes.findOneAndUpdate({job: id}, {$addToSet: {notes: note}}, (err, doc) => {
		if(err) return cb(err);
		// console.log(doc);
		return cb(null);
	});
  // Notes.findOne({user: user}, (err, data) => {
  //   if (err) return cb(err);
  //   // checks if notes model is created for user
	// 	if (data){
	// 		let index;
  //     let found = false;
  //     // finds the object that references the job
	// 		for(let i = 0; i < data.notes.length; i++) {
	// 			if(data.notes[i].jobReference === id){
	// 				index = i;
	// 				found = true;
	// 				break;
	// 			}
  //     }
  //     // if is already created, push new note to the array
	// 		if (found){
	// 		console.log('notes model is already created!');
	// 		data.notes[index].notes.push(note)
	// 		data.save((err, doc) => {
	// 			if (err){
	// 				console.log(err);
	// 				return cb(err);
	// 			} 
	// 			return cb(null);
	// 		});
  //     }
  //   // if job object isnt created, create it and push it
	// 		else {
	// 			console.log('notes model is not created!');
	// 			let jobNotes = {
	// 				jobReference: id,
	// 				notes: [note]
	// 			}
	// 			data.notes.push(jobNotes);
	// 			data.save((err, doc) =>{
	// 				if (err) return cb(err);
	// 				return cb(null)
	// 			});
  //     }
  //     // if user does not have a Notes model 
	// 	} else {
	// 		let newNotes = new Notes({
	// 			notes: [{
	// 				jobReference: id,
	// 				notes: [note]
	// 			}],
	// 			user: user
	// 		});
	// 		newNotes.save((err, doc) => {
	// 			if (err){
	// 				console.log(err);
	// 				return cb(err);
	// 			} 
	// 		  return cb(null);
	// 		});	
	// 	}
	// })
}
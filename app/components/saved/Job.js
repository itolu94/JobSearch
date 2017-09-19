import React, {Component} from 'react';

const Job = ({savedJob, openModal, deleteJob, index, editJob}) => {
let color;
  switch (savedJob.status){
  case 'Applied':
    color = 'red';
    break;
  case 'Interested':
    color = 'grey';
    break; 
  case 'Waiting':
    color = 'yellow';
    break;
  case 'Accepted':
    color = 'green';
    break;
  default:
    color = 'black';
}
  let statusColor = {color};
	return(
	  <div className="row job">
        <div className="cl l12">
          <div className="jobPosting">
            <p>{savedJob.title}</p>
            <ul>
              <li className="company"><span>Company:  </span> {savedJob.company} </li>
              <li className="location"><span>Location:  </span> {savedJob.location}</li>
              <li className="url"><span>URL:  </span> <a target='_blank' href={savedJob.link}>Link</a></li>
            </ul>
            <div>
              <div className='saved-icon'> 
                <i style={statusColor} className="material-icons">account_box</i> <span> {savedJob.status} </span>
              </div> 
              <div className='applyButtons'>
                <button 
                  onClick={() => openModal(savedJob.notes.notes, savedJob._id)} 
                  className=" waves-effect waves-light btn notes">Add Notes</button>
                  <button onClick={() => editJob(index)} 
                  className="waves-effect waves-light btn editJob">Edit Job</button>

                  <button onClick={() => deleteJob(index)} 
                  className="waves-effect waves-light btn delete">Delete Job</button>
               </div>
            </div>
          </div>
      </div>
    </div>
          )

}

export default Job;
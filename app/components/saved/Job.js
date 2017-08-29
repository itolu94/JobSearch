import React, {Component} from 'react';

const Job = ({savedJob, openModal, deleteJob, index}) => {

	return(
	<div className="row ">
        <div className="cl l12">
          <div className="jobPosting">
            <p>{savedJob.title}</p>
            <ul>
              <li className="company"><span>Company:  </span> {savedJob.company} </li>
              <li className="location"><span>Location:  </span> {savedJob.location}</li>
              <li className="url"><span>URL:  </span> <a target='_blank' href={savedJob.link}>Link</a></li>
            </ul>
          <div>
            <div className='applyButtons'>
            <button 
              onClick={() => openModal(savedJob._id)} 
              className=" waves-effect waves-light btn notes">Add Notes</button>
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
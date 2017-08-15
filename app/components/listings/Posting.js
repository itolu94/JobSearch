import React, {Component} from 'react';

const Posting = ({post, applyToJob}) => {

	return(
	<div className="row ">
        <div className="cl l12">
          <div className="jobPosting">
            <p>{post.jobTitle}</p>
            <ul>
              <li className="company"><span>Company:  </span> {post.company}</li>
              <li className="location"><span>Location:  </span> {post.location}</li>
              <li className="url"><span>URL:  </span> <a target='_blank' href={post.detailUrl}>Link</a></li>
            </ul>
          <div>
            <button onClick={() => applyToJob(post)}className="apply">Apply</button>
            <button className="interested">Interested</button>
          </div>
        </div>
      </div>
    </div>
          )

}

export default Posting;
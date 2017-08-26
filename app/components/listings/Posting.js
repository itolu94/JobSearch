import React, {Component} from 'react';

const Posting = ({post, applyToJob, website}) => {
    let image;
    if(website === 'Dice') {
      image = 'images/DiceLogo.jpg';
    }
     else if(website === 'CyberCoders') {
      image = 'images/CyberCodersLogo.jpg';      
    }
	return(
	<div className="row posting">
        <div className="cl l12">
          <div className="jobPosting">
          <div className="jobInfo">
            <p>{post.jobTitle}</p>
            <ul>
              <li className="company"><span>Company:  </span> {post.company}</li>
              <li className="location"><span>Location:  </span> {post.location}</li>
              <li className="url"><span>URL:  </span> <a target='_blank' href={post.detailUrl}>Link</a></li>
            </ul>
            <div className='applyButtons'>
            <button className='waves-effect waves-light btn apply' onClick={() => applyToJob(post)}>Apply</button>
            <button className="waves-effect waves-light btn">Interested</button>
          </div>
          </div>  
          <img className='listingWebsite' src={image} />           
        </div>
      </div>
    </div>
          )

}

export default Posting;
import React, {Component} from 'react';

const Posting = ({post, applyToJob, website}) => {
    return (
        <div className="row posting">
            <div className="cl l12">
                <div className=" row jobPosting">
                    <div className="jobInfo">
                        <p>{post.jobTitle}</p>
                        <ul>
                            <li className="company"><span>Company:  </span> {post.company}</li>
                            <li className="location"><span>Location:  </span> {post.location}</li>
                            <li className="url"><span>URL:  </span> <a target='_blank' href={post.detailUrl}>Link</a>
                            </li>
                        </ul>
                        <div className='col  s12 applyDiv'>
                            <button className='waves-effect waves-light btn apply applyButtons'
                                    onClick={() => applyToJob(post, 'Applied')}>Apply
                            </button>
                            <button className="waves-effect waves-light btn interestedButtons"
                                    onClick={() => applyToJob(post, 'Interested')}>Interested
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Posting;
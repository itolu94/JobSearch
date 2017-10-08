import React, {Component} from 'react';
import Job from './Job';
import Pagination from './Pagination';


export default class SavedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

    //TODO Continue with this function
    pagination() {
        //TODO return boolean making a request for next page
            return (
                <Pagination
                    page={this.props.page}
                    morePages={this.props.morePages}
                    changePage={this.props.changePage}
                />
            )
    }

    makeComponentJob() {
        if (this.props.jobs.length > 0) {
            return this.props.jobs.map((savedJob, index) => {
                return (<Job
                        editJob={this.props.editJob}
                        key={savedJob._id}
                        index={index}
                        deleteJob={this.props.delete}
                        savedJob={savedJob}
                        openModal={this.props.openModal}
                    />
                )
            })
        } else {
            return (
                <div className="row job">
                    <div className="cl l12">
                        <div className="jobPosting center-align">
                            <p>No Saved Jobs</p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='container'>
                <div>
                    <div className='organizerDiv cl l2 offset-l5'>
                        <select
                            id='organizer'
                            value={this.props.organize}
                            onChange={(e) => this.props.organizeBy(e.target.value)}
                        >
                            <option value='Date'> Date</option>
                            <option value='Title'> Title</option>
                            <option value='Status'> Status</option>
                        </select>
                    </div>
                    {this.pagination()}
                    {this.makeComponentJob()}
                    {this.pagination()}
                </div>
            </div>
        )
    }
}

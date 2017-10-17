import React, {Component} from 'react';
import Dice from './websites/Dice.jsx';
import CyberCoders from './websites/CyberCoders';
import ZipRecruiter from './websites/ZipRecruiter';
import axios from 'axios'
import {Row, Col, Preloader} from 'react-materialize';
// import

export default class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            job: '',
            page: 1,
            loading: true
        }
        this.makeComponent = this.makeComponent.bind(this);
        this.applyToJob = this.applyToJob.bind(this);
        this.getDice = this.getDice.bind(this);
        this.changePage = this.changePage.bind(this);
        this.getZipRecruiter = this.getZipRecruiter.bind(this);
        this.displayListings = this.displayListings.bind(this);
    };

    makeComponent() {
        if (this.state.job !== '') {
            return this.state.job.map((post) => {
                return <Posting key={post.detailUrl} website={this.props.website} post={post}
                                applyToJob={this.applyToJob}/>
            });
        }
    }

    applyToJob(listing, status) {
        listing.source = this.props.website;
        listing.status = status
        // console.log(listing);
        axios.post('/api/add-job', listing).then((data) => {
            console.log(data)
        })
    }

    getDice() {
        axios.get('api/dice',
            {
                params:
                    {
                        title: this.props.job,
                        city: this.props.city,
                        state: this.props.state,
                        page: this.state.page
                    }
            }).then((resp) => {
            this.setState({
                job: resp.data,
                loading: false
            });

        })
    }

    getCyberCoders() {
        axios.get(`api/cyber-coders`,
            {
                params:
                    {
                        title: this.props.job,
                        city: this.props.city,
                        state: this.props.state,
                        page: this.state.page
                    }
            })
            .then((resp) => {
                this.setState({
                    job: resp.data,
                    loading: false
                });
                // console.log(this.state.job);
            });
    }

    getZipRecruiter() {
        axios.get(`api/zip-recruiter`,
            {
                params:
                    {
                        title: this.props.job,
                        city: this.props.city,
                        state: this.props.state,
                        page: this.state.page
                    }
            })
            .then((resp) => {
                this.setState({
                    job: resp.data,
                    loading: false
                });
                // console.log(this.state.job);
            });
    }

    changePage(page) {

        if (page > 0) {
            this.setState({
                page,
                loading: true
            });
            switch (this.props.website) {
                case 'Dice':
                    this.getDice();
                    break;
                case 'CyberCoders':
                    this.getCyberCoders();
                    break;
                case 'ZipRecruiter':
                    this.getZipRecruiter();
            }
        }
    }

    componentWillMount() {
        if (this.props.website === 'Dice') {
            this.getDice();
        } else if (this.props.website === 'CyberCoders') {
            this.getCyberCoders();
        } else if (this.props.website === 'ZipRecruiter') {
            this.getZipRecruiter();
        }
    }

    displayListings() {
        let website = this.props.website;
        if (this.state.loading) {
            return (
                <div className='container'>
                    <div>
                        <div className='center-align'>
                            <Row>
                                <Col  s={10} >
                                    <Preloader className="windowLoading" size="large"/>
                                </Col>

                            </Row>;
                        </div>
                    </div>
                </div>
            )
        } else {
            if (website === 'CyberCoders') {
                return (
                    <CyberCoders
                        page={this.state.page}
                        job={this.state.job}
                        website={this.props.website}
                        changePage={this.changePage}
                        applyToJob={this.applyToJob}
                    />);
            } else if (website === 'ZipRecruiter') {
                return (
                    <ZipRecruiter
                        page={this.state.page}
                        job={this.state.job}
                        website={this.props.website}
                        changePage={this.changePage}
                        applyToJob={this.applyToJob}
                    />);
            } else if (website === 'Dice') {
                return (
                    <Dice
                        page={this.state.page}
                        job={this.state.job}
                        website={this.props.website}
                        changePage={this.changePage}
                        applyToJob={this.applyToJob}
                    />);
            }
        }
    }

    render() {
        // let website = this.props.website;
        // let imgSrc;
        // if (website === 'ZipRecruiter') {
        //     imgSrc = './images/ZipRecruiter.png';
        // } else if (website === "Dice") {
        //     imgSrc = './images/DiceLogo.jpg';
        // } else if (website === "CyberCoders") {
        //     imgSrc = './images/CyberCodersLogo.png';
        // }
        return (
            <div className='container'>
                <h1 className='center-align page-title'>Listings</h1>
                <div className='center-align'>
                    {/*<img src={imgSrc} className='center-align listingImg' alt=""/>*/}
                </div>
                {this.displayListings()}
            </div>
        )
    }
}

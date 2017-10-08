import React, {Component} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import SavedJobs from './Savedjobs';
import ModalContent from './model-content/ModelContent';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: '400px',
        width: '600px',
        border: '4px solid black',
        overflowY: 'auto',
        marginRight: '-80%',
        'background-image': 'url(https://images.freecreatives.com/wp-content/uploads/2015/04/natural-paper-background-texture-hd-5a0b.jpg)',
        transform: 'translate(-50%, -50%)'
    }
};


export default class ModalAndSavedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            jobs: [],
            notes: '',
            id: '',
            value: '',
            content: 'notes',
            currentJob: '',
            index: '',
            organize: 'Date',
            page: 1,
            morePages: true,
            nextPage: true,

        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.addNote = this.addNote.bind(this);
        this.noteText = this.noteText.bind(this);
        this.addJob = this.addJob.bind(this);
        this.getJobs = this.getJobs.bind(this);
        this.editJob = this.editJob.bind(this);
        this.setIndex = this.setIndex.bind(this);
        this.updateJob = this.updateJob.bind(this);
        this.organizeBy = this.organizeBy.bind(this);
        this.changePage =  this.changePage.bind(this);
    }

    openModal(notes, id) {
        this.setState({
            modalIsOpen: true,
            notes: notes,
            id: id
        });

    }
    organizeBy(organize) {
        this.setState({organize});
        let notesObj = {};
        axios.get('/api/saved-jobs',
            {
                params: {organizeBy: organize}
            }).then((response) => {
            if (response.data.status === 'err') {
                console.log(response.data.err);
            }
            this.setState({
                jobs: response.data.status,
                notes: response.data.status.userNotes
            });
        });
    }

    changePage(page){
        let organizeBy = this.state.organize;
        axios.get('/api/saved-jobs',
            {
                params: {
                    organizeBy,
                    page
                }
            }).then((response) => {
            if (response.data.status === 'err') {
                console.log(response.data.err);
            }
            this.setState({
                jobs: response.data.status,
                notes: response.data.status.userNotes
            });
        });
    }
    afterOpenModal() {
        // references are now sync'd and can be accessed. 
        this.subtitle.style.color = 'black';
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            content: 'notes'
        });
    }

    noteText(event) {
        this.setState({value: event.target.value})
    }

    deleteNote(index) {
        let editNotes = this.state.notes;
        let _id = this.state.id;
        axios.delete('/api/delete-jobs-note',
            {
                params:
                    {
                        _id,
                        index
                    }
            })
            .then(() => {
                editNotes.splice(index.index, 1);
                this.forceUpdate();
            });
    }

    setIndex(index) {
        this.setState({
            index
        })
    }

    addNote(event) {
        event.preventDefault();
        // let editNotes = this.state.notes;
        let note = this.state.value;
        let id = this.state.id;
        let data = {
            id,
            note
        }
        axios.put('api/notes', data).then((response) => {
            this.state.notes.push(note);
            this.setState({value: ''});
        });

    }

    //TODO was used for job form.. Determine if func. can be deleted
    getJobs(organize) {
        // let notesObj = {};
        // axios.get('/api/saved-jobs',
        //     {
        //         params: {
        //             organizeBy: organize,
        //             page: this.state.page
        //         }
        //     }).then((response) => {
        //     if (response.data.status === 'err') {
        //         console.log(response.data.err);
        //     }
        //     this.setState({
        //         jobs: response.data.status,
        //         notes: response.data.status.userNotes
        //     });
        // });
    }

    addJob() {
        this.setState({content: 'newJob'});
        this.openModal();
    }

    editJob(index) {
        this.setState({
            currentJob: this.state.jobs[index],
            content: 'edit'
        })
        this.openModal();
    }

    updateJob() {
        axios.get('/api/saved-jobs').then((response) => {
            // console.log(response);
            if (response.data.status === 'err') {
                console.log(response.data.err);
            }
            this.setState({
                jobs: response.data.status,
                notes: response.data.status.userNotes
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteJob(index) {
        axios.delete('api/delete-job', {params: {jobId: this.state.jobs[index]._id}})
            .then((data) => {
                this.state.jobs.splice(index, 1);
                this.forceUpdate();
            })
            .catch((err) => {
                console.log(err);
            })

    }

    componentWillMount() {
        axios.get('/api/saved-jobs',
            {
                params:
                    {
                        organizeBy: this.state.organize,
                        page: this.state.page

                    }
            }).then((response) => {
            // console.log(response);
            if (response.data.status === 'err') {
                console.log(response.data.err);
            }
            console.log(response.data);
            this.setState({
                jobs: response.data.status,
                notes: response.data.status.userNotes,
                morePages: response.data.morePages
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <h1 className='center-align page-title'>Saved Jobs</h1>
                {/*<button onClick={this.addJob}>Add Job</button> */}
                <SavedJobs
                    delete={this.deleteJob}
                    jobs={this.state.jobs}
                    openModal={this.openModal}
                    editJob={this.editJob}
                    organize={this.state.organize}
                    organizeBy={this.organizeBy}
                    page={this.state.page}
                    morePages={this.state.morePages}
                    changePage={this.changePage}
                />
                <div>
                    <Modal isOpen={this.state.modalIsOpen}
                           onAfterOpen={this.afterOpenModal}
                           onRequestClose={this.closeModal}
                           style={customStyles}
                           contentLabel="Modal">
                        <h2 className='center-align' ref={subtitle => this.subtitle = subtitle}> Notes </h2>
                        <div>
                            <ModalContent
                                value={this.state.value}
                                noteText={this.noteText}
                                addNote={this.addNote}
                                deleteNote={this.deleteNote}
                                id={this.state.id}
                                notes={this.state.notes}
                                content={this.state.content}
                                getJobs={this.getJobs}
                                currentJob={this.state.currentJob}
                                index={this.setIndex}
                                updateJob={this.updateJob}
                            />
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

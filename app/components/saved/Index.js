import React, { Component } from 'react';
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
            index: ''
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
    }
    openModal(notes, id) {
       this.setState({ 
        modalIsOpen: true,
        notes: notes,
        id: id
    });

    }

    afterOpenModal() {
        // references are now sync'd and can be accessed. 
        this.subtitle.style.color = 'black';
    }

    closeModal() {
        this.setState({ 
            modalIsOpen: false ,
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
        {params: 
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
        axios.put('api/notes', data).then((response) =>{
            this.state.notes.push(note);
            this.setState({value: ''});            
        });

    }

    getJobs(){
        let notesObj = {};
        axios.get('/api').then((response) =>{
            this.setState({jobs: response.data});
            response.data.map((notes) => {
                notesObj[notes._id] = notes.notes
            });
        })
    }

    addJob(){
        this.setState({content: 'newJob'});
        this.openModal();
    }

    editJob(index){
        this.setState({
            currentJob: this.state.jobs[index],
            content: 'edit'
        })
        this.openModal();
    }

    updateJob(data){
        axios.get('/api/saved-jobs').then((response) => {
            // console.log(response);
            if(response.data.status === 'err') {
                console.log(response.data.err);
            }
            this.setState({jobs: response.data.status,
            notes: response.data.status.userNotes
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteJob(index){
        axios.delete('api/delete-job', {params: {jobId: this.state.jobs[index]._id}})
        .then((data) =>{
            this.state.jobs.splice(index, 1);
            this.forceUpdate();
        })
        .catch((err) => {
            console.log(err);
        })

    }
    componentWillMount() {
        axios.get('/api/saved-jobs').then((response) => {
            // console.log(response);
            if(response.data.status === 'err') {
                console.log(response.data.err);
            }
            this.setState({jobs: response.data.status,
            notes: response.data.status.userNotes
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
                />
        		<div>
            		<Modal isOpen = { this.state.modalIsOpen }
	            		onAfterOpen ={ this.afterOpenModal }
			            onRequestClose = { this.closeModal }
			            style = { customStyles }
			            contentLabel = "Modal">
						<h2 className='center-align' ref={ subtitle => this.subtitle = subtitle }> Notes </h2>
                         <div >
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
                              index = {this.setIndex}
                              updateJob = {this.updateJob}
                              />
                        </div>
            		</Modal> 
            	</div>
        	</div>
        );
    }
}

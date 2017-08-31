import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import SavedJobs from './Savedjobs';
import ModalContent from './ModelContent';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: '400px',
        width: '600px',
        overflowY: 'scroll',
        marginRight: '-80%',
        background: 'lightslategrey',
        transform: 'translate(-50%, -50%)'
    }
};


export default class ModalAndSavedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            jobs: [],
            notes: [],
            id: '',
            value: '',
            content: 'notes'
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
    }
    openModal(id) {
       this.setState({ 
        modalIsOpen: true,
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
                _id: _id,
                note: this.state.notes[_id]
            }
        })
        .then(() => {
          editNotes[_id].splice(index.index, 1);
          this.forceUpdate();  
        });
    }

    addNote(event) {
        event.preventDefault();
        let editNotes = this.state.notes;
        let note = this.state.value;
        let id = this.state.id;
        let data = {
            id, 
            note
        }
        axios.put('api/notes', data).then((response) =>{
            editNotes[id].push(note);
            this.setState({value: ''});
        });
    }

    addJob(){
        this.setState({content: 'newJob'});
        this.openModal();
    }

    getJobs(){
        console.log('Was successful')
        let notesObj = {};
        axios.get('/api').then((response) =>{
            this.setState({jobs: response.data});
            response.data.map((notes) => {
                notesObj[notes._id] = notes.notes
            });
        })
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
    componentWillMount(){
        let notesObj = {}
        axios.get('/api').then((response) =>{
            this.setState({jobs: response.data});
            response.data.map((notes) => {
                notesObj[notes._id] = notes.notes
            });
        })
        .catch((err) => {
            console.log(err);
        })
        this.setState({notes: notesObj});    
    }
    render() {
        return (
            <div> 
                <h1 className='center-align page-title'>Saved Jobs</h1>
                <button onClick={this.addJob}>Add Job</button>
                <SavedJobs 
                delete={this.deleteJob} 
                jobs={this.state.jobs} 
                openModal={this.openModal}
                />
        		<div>
            		<Modal isOpen = { this.state.modalIsOpen }
	            		onAfterOpen ={ this.afterOpenModal }
			            onRequestClose = { this.closeModal }
			            style = { customStyles }
			            contentLabel = "Modal">
						<h2 className='center-align' ref={ subtitle => this.subtitle = subtitle }> Notes </h2>
                         <div >
                             <ModalContent value={this.state.value}
                              noteText={this.noteText} 
                              newNote={this.addNote} 
                              deleteNote={this.deleteNote} 
                              id={this.state.id} 
                              notes={this.state.notes}
                              content={this.state.content}
                              getJobs={this.getJobs}
                              />
                        </div>
            		</Modal> 
            	</div>
        	</div>
        );
    }
}

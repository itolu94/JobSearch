import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import SavedJobs from './Savedjobs';
import Notes from './Notes';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: '400px',
        width: '600px',
        overflowY: 'scroll',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


class NotesAndModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            jobs: [],
            notes: [],
            id: '',
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    openModal(id) {
       this.setState({ 
        modalIsOpen: true,
        id: id
    });

    }

    afterOpenModal() {
        // references are now sync'd and can be accessed. 
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    deleteNote(index) {
        let editNotes = this.state.notes
        let id = this.state.id
        editNotes[id].splice(index.index, 1);
        this.forceUpdate();

    }

    addNote(note, e) {
        e.preventDefault();
        let editNotes = this.state.notes;
        let id = this.state.id;
        let data = {
            id: this.state.id, 
            note: note
        }
        axios.put('api/notes', data).then((response) =>{
            editNotes[id].push(note);
        });
            this.forceUpdate();
    }

    deleteJob(index){
        this.state.jobs.splice(index, 1);
        this.forceUpdate();
    }
    componentWillMount(){
        let notesObj = {}
        axios.get('/api').then((response) =>{
            this.setState({jobs: response.data});
            response.data.map((notes) => {
                notesObj[notes._id] = notes.notes
            });
        });
        this.setState({notes: notesObj});    
    }
    render() {
        return (
        	<div> 
                <SavedJobs delete={this.deleteJob} jobs={this.state.jobs} openModal={this.openModal}/>
        		<div>
            		<Modal isOpen = { this.state.modalIsOpen }
	            		onAfterOpen ={ this.afterOpenModal }
			            onRequestClose = { this.closeModal }
			            style = { customStyles }
			            contentLabel = "Example Modal">
						<h2 ref={ subtitle => this.subtitle = subtitle }> Notes </h2>
                         <div>
                             <Notes newNote={this.addNote} deleteNote={this.deleteNote} id={this.state.id} notes={this.state.notes}/>
                        </div>
            		</Modal> 
            	</div>
        	</div>
        );
    }
}

export default NotesAndModal

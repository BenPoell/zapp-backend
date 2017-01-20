//QuestionBox.js
import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import Paper from 'material-ui/Paper';
import QuestionList from './QuestionList';
import QuestionDeleteDialog from './QuestionDeleteDialog';
import QuestionListToolbar from './QuestionListToolbar';
import overallStyle from './styles/overallStyles';

import QuestionDialog from './QuestionDialog';

class QuestionBox extends Component {
    constructor(props) {
        super(props);
        this.state = { open: '', data: [], topics: [], topicId: '' };
        
        this.loadQuestionsFromServer = this.loadQuestionsFromServer.bind(this);
        this.loadTopicsFromServer = this.loadTopicsFromServer.bind(this);
		
        this.handleTopicChange = this.handleTopicChange.bind(this);
		
        this.handleQuestionDelete = this.handleQuestionDelete.bind(this);
        this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
        this.handleQuestionInsert = this.handleQuestionInsert.bind(this);
		
        this.handleOpenQuestionInsert = this.handleOpenQuestionInsert.bind(this);
    }
	
	loadQuestionsFromServer() {	   		
		if (this.state.topicId !== '')
		{
			var urlByTopic = this.props.urlByTopic + '/' + this.state.topicId;
			
			axios.get(urlByTopic)
				.then(res => {
					this.setState({ data: res.data });				
				});			
		}
		else
		{
			var url = this.props.url;
			
			axios.get(url)
				.then(res => {
					this.setState({ data: res.data });				
				});				
		}
    }
	
	loadTopicsFromServer() {
        axios.get(this.props.urlTopics)
			.then(res => {
				this.setState({ topics: res.data });				
			});
    }
		
    handleQuestionDelete(id) {
		if (id != null) {	
			axios.delete(`${this.props.url}/${id}`)
			.then(res => {
				PubSub.publish( 'showSnackbarWithMessage', 'Question was successfully deleted' );
			})
			.catch(err => {
				PubSub.publish( 'showSnackbarWithMessage', 'There was some error while deleting the question' );
				console.log(err)
			});
		}
		else {
			PubSub.publish( 'showSnackbarWithMessage', 'There was some error while deleting the question' );			
		}
    }
	
    handleQuestionUpdate(id, question) {
        //sends the question id and new question/scope/data... to our api
        question.changeDate = Date.now();
		
		if (id != null) {							
			axios.put(`${this.props.url}/${id}`, question)
			.then(res => {
				PubSub.publish( 'showSnackbarWithMessage', 'Question was successfully updated' );
			})
			.catch(err => {
				PubSub.publish( 'showSnackbarWithMessage', 'There was some error while updating the question' );
				console.log(err)
			});
		}
		else {
			PubSub.publish( 'showSnackbarWithMessage', 'There was some error while updating the question' );			
		}
    }
	
	handleQuestionInsert(question) {
		// set data for new question that is posted and then concatinated to the questions list as new newQuestions list
        let questions = this.state.data;
        question._id = Date.now();
        question.createDate = Date.now();
        question.changeDate = Date.now();
		question.topic = this.state.topicId;
        let newQuestions = questions.concat([question]);
        this.setState({ data: newQuestions });
        axios.post(this.props.url, question)
        .then(res => {
            // display Snackbar with info - via PubSub that was defined in Snackbar Component
            PubSub.publish( 'showSnackbarWithMessage', 'Question was successfully added' );
        })
        .catch(err => {
            // display Error in Snackbar
            PubSub.publish( 'showSnackbarWithMessage', 'There was some error while adding the question' );
            console.log(err)
            this.setState({ data: questions });
        });
    }	
	
    handleOpenQuestionInsert(e) {
        e.preventDefault();
		
        //brings up the update field when we click on the update link.
        this.setState({ open: 'insert' });		
	}	
		
	handleClose = () => {
		this.setState({open: ''});
	};
	
    handleTopicChange(e) {
        this.setState({ topicId: e });
    }
	
    componentDidMount() {
        this.loadQuestionsFromServer();
        setInterval(this.loadQuestionsFromServer, this.props.pollInterval);
		
        this.loadTopicsFromServer();
        setInterval(this.loadTopicsFromServer, this.props.pollInterval);
    }
	
    render() {
            return (
                <div>
                    <Paper style={overallStyle.QuestionPaper} zDepth={3}>
                        <QuestionListToolbar 
							topics={this.state.topics} 
							id={this.state.topicId} 
							onTopicChange={this.handleTopicChange}
							onQuestionInsert={this.handleOpenQuestionInsert}/>
                        <QuestionList 
							onQuestionUpdate={ this.handleQuestionUpdate } 
							data={ this.state.data }/>
						<QuestionDialog 
							onQuestionInsert={this.handleQuestionInsert} 
							onClose={this.handleClose}
							open={this.state.open}
							uniqueID={this.props.uniqueID}
							key={this.props.uniqueID}
							active={this.state.active} 
							topic={this.state.topic}
							level={this.state.level}
							scope={this.state.scope}
							question={this.state.question}
							hint={this.state.hint}
							answer={this.state.answer}
							/>
                    </Paper>
                    <QuestionDeleteDialog onQuestionDelete={this.handleQuestionDelete}/>
                </div>
            )
        }
}
export default QuestionBox;
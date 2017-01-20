//TopicBox.js
import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import Paper from 'material-ui/Paper';
import TopicList from './TopicList';
import TopicDeleteDialog from './TopicDeleteDialog';
import TopicListToolbar from './TopicListToolbar';
import TopicDialog from './TopicDialog';

import overallStyle from './styles/overallStyles';

class TopicBox extends Component {
    constructor(props) {
        super(props);
        this.state = {open: '', data: [] };
        
        this.loadTopicsFromServer = this.loadTopicsFromServer.bind(this);
		
        this.handleTopicDelete = this.handleTopicDelete.bind(this);
        this.handleTopicUpdate = this.handleTopicUpdate.bind(this);
        this.handleTopicInsert = this.handleTopicInsert.bind(this);
		
        this.handleOpenTopicInsert = this.handleOpenTopicInsert.bind(this);
    }
    loadTopicsFromServer() {
        axios.get(this.props.url).then(res => {
            this.setState({ data: res.data });
        })
    }
	
    handleTopicDelete(id) {
		if (id != null) {
			axios.delete(`${this.props.url}/${id}`)
			.then(res => {
				PubSub.publish( 'showSnackbarWithMessage', `Topic was successfully deleted` );
			})
			.catch(err => {
				PubSub.publish( 'showSnackbarWithMessage', `There was some error while deleting the topic` );
				console.log(err)
			});
		}
		else {			
			PubSub.publish( 'showSnackbarWithMessage', `There was some error while deleting the topic` );		
		}
    }
	
    handleTopicUpdate(id, topic) {
        //sends the topic id and new name/description/data... to our api
        topic.changeDate = Date.now();
		
		if (id != null) {
			axios.put(`${this.props.url}/${id}`, topic)
			.then(res => {
				PubSub.publish( 'showSnackbarWithMessage', `Topic was successfully updated` );
			})
			.catch(err => {
				PubSub.publish( 'showSnackbarWithMessage', `There was some error while updating the topic` );
				console.log(err)
			});
		}
		else {			
			PubSub.publish( 'showSnackbarWithMessage', `There was some error while updating the topic` );			
		}
    }
	
    handleTopicInsert(topic) {
        // set data for new topic that is posted and then concatinated to the topics list as new newTopics list
        let topics = this.state.data;
        topic._id = Date.now();
        topic.createDate = Date.now();
        topic.changeDate = Date.now();
        let newTopics = topics.concat([topic]);
        this.setState({ data: newTopics });
        axios.post(this.props.url, topic)
        .then(res => {
            // display Snackbar with info - via PubSub that was defined in Snackbar Component
            PubSub.publish( 'showSnackbarWithMessage', `Topic was successfully added` );
        })
        .catch(err => {
            // display Error in Snackbar
            PubSub.publish( 'showSnackbarWithMessage', `There was some error while adding the topic` );
            console.log(err)
            this.setState({ data: topics });
        });
    }
	
    handleOpenTopicInsert(e) {
        e.preventDefault();
		
        //brings up the update field when we click on the update link.
        this.setState({ open: 'insert' });		
	}	
	
	handleClose = () => {
		this.setState({open: ''});
	};	
	
    componentDidMount() {
        this.loadTopicsFromServer();
        setInterval(this.loadTopicsFromServer, this.props.pollInterval);
    }
    render() {
            return (
                <div>
                    <Paper style={overallStyle.TopicPaper} zDepth={3}>
                        <TopicListToolbar 
							onTopicInsert={this.handleOpenTopicInsert}/>
                        <TopicList 
							onTopicUpdate={ this.handleTopicUpdate } 
							data={ this.state.data }/>							
						<TopicDialog 
							onTopicInsert={ this.handleTopicInsert } 
							onClose={this.handleClose}
							open={this.state.open}
							uniqueID={ this.props.uniqueID }
							key={ this.props.uniqueID }
							active={this.state.active} 
							icon={this.state.icon}
							name={ this.state.name }
							description={ this.state.description }>
						</TopicDialog> 
                    </Paper>
                    <TopicDeleteDialog onTopicDelete={this.handleTopicDelete}/>
                </div>
            )
        }
}
export default TopicBox;
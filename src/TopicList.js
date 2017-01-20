//TopicList.js
import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Topic from './Topic';
import listStyle from './styles/listStyles';

class TopicList extends Component {
    render() {
        let topicNodes = this.props.data.map(topic => {
            // for the letter avatar the first letters of the first two words (if a second word exists)
            let name_short = topic.name.split(' ')[0].substr(0,1).toUpperCase() + (topic.name.split(' ').length >= 2 ? topic.name.split(' ')[1].substr(0,1).toUpperCase() : '')
            return (
                <Topic 
					onTopicUpdate={ this.props.onTopicUpdate } 
					uniqueID={ topic['_id'] }
					key={ topic['_id'] }
					active={topic.active} 
					icon={topic.icon}
					name={ topic.name }
					name_short={ name_short }
					description={ topic.description }>
                </Topic> 
            )
        })
        return (
            <div>
                <List style={listStyle.topicList}>
                    { topicNodes }
                </List>              
            </div>
        )
    }
}
export default TopicList;
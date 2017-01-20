import React, { Component } from 'react';
//import IconMenu from 'material-ui/IconMenu';
//import IconButton from 'material-ui/IconButton';
//import SaveIcon from 'material-ui/svg-icons/content/save';
//import MenuItem from 'material-ui/MenuItem';
//import DropDownMenu from 'material-ui/DropDownMenu';
//import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import QuestionTopicSelect from './QuestionTopicSelect';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {
  cyan500,
  white
} from 'material-ui/styles/colors';
import topicSelectStyle from './styles/topicSelectStyles';


class QuestionListToolbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Paper zDepth={2}>
        <Toolbar style={{backgroundColor: cyan500}}>
          <ToolbarGroup>
				<ToolbarTitle text="Questions" />
          </ToolbarGroup>
          <ToolbarGroup>
				<QuestionTopicSelect topics={this.props.topics} id={this.props.topicId} onTopicChange={this.props.onTopicChange}/>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
			<FloatingActionButton mini={true} style={topicSelectStyle.FloatingActionButton} onTouchTap={this.props.onQuestionInsert}>
			  <ContentAdd />
			</FloatingActionButton>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

export default QuestionListToolbar;
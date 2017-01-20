import React, { Component } from 'react';
//import IconMenu from 'material-ui/IconMenu';
//import IconButton from 'material-ui/IconButton';
//import SaveIcon from 'material-ui/svg-icons/content/save';
//import MenuItem from 'material-ui/MenuItem';
//import DropDownMenu from 'material-ui/DropDownMenu';
//import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {
  cyan500
} from 'material-ui/styles/colors';

import topicSelectStyle from './styles/topicSelectStyles';

class TopicListToolbar extends Component {

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
            <ToolbarTitle text="Topics" />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
			<FloatingActionButton mini={true} style={topicSelectStyle.FloatingActionButton} onTouchTap={this.props.onTopicInsert}>
			  <ContentAdd />
			</FloatingActionButton>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}

export default TopicListToolbar;
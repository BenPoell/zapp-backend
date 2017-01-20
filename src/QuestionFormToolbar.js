import React, { Component } from 'react';
//import IconMenu from 'material-ui/IconMenu';
//import IconButton from 'material-ui/IconButton';
//import SaveIcon from 'material-ui/svg-icons/content/save';
//import MenuItem from 'material-ui/MenuItem';
//import DropDownMenu from 'material-ui/DropDownMenu';
//import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import {
  cyan500
} from 'material-ui/styles/colors';


class QuestionFormToolbar extends Component {

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
            <Toolbar style={{backgroundColor: cyan500} }>
                <ToolbarGroup>
                <ToolbarTitle text="New Question" />
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>
                </ToolbarGroup>
            </Toolbar>
        </Paper>
    );
  }
}

export default QuestionFormToolbar;
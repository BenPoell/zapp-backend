import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import listStyle from './styles/listStyles';
import {blueGrey500} from 'material-ui/styles/colors';


class QuestionAvatar extends Component {
  render() {
    return (
      <Avatar
      //color={deepOrange300}     
      backgroundColor={blueGrey500}
      size={35}
      style={listStyle.questionAvatar}
      >
        {this.props.content}
      </Avatar>
    );
  }
}

export default QuestionAvatar;
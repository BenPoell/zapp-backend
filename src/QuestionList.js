//QuestionList.js
import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Question from './Question';
import listStyle from './styles/listStyles';

class QuestionList extends Component {
    render() {
		let questionNodes = this.props.data.map(question => {
            // for the letter avatar the first letters of the first two words (if a second word exists)
            //let name_short = question.question.split(' ')[0].substr(0,1).toUpperCase() + (question.question.split(' ').length >= 2 ? question.question.split(' ')[1].substr(0,1).toUpperCase() : '')
            return (
                <Question
					onQuestionUpdate={ this.props.onQuestionUpdate } 
					uniqueID={question['_id']}
					key={question['_id']}
					active={question.active} 
					topic={question.topic}
					level={question.level}
					scope={question.scope}
					question={question.question}
					hint={question.hint}
					answer={question.answer}
                >
                </Question> 
            )
        })
        return (
            <div>
                <List style={listStyle.questionList}>
                    { questionNodes }
                </List>              
            </div>
        )
    }
}
export default QuestionList;
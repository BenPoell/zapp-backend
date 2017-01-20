//Comment.js
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';

import MenuItem from 'material-ui/MenuItem';
import formStyle from './styles/formStyles';
import {red500} from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';

import Checkbox from 'material-ui/Checkbox'


class QuestionAnswer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: false,
            id: 0,
            answer: '',
            solution: false
        };
		
        this.updateAnswer = this.updateAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
		
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
		
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSolutionChange = this.handleSolutionChange.bind(this);
    }
	
    optionTapped(event: object, child: object) { 
        if(child.props.value === 'edit')
        {
          this.updateQuestion(event)
        }
        else if(child.props.value === 'delete')
        {
          this.deleteQuestion(event)
        }
    }
	
    updateAnswer() {
        //brings up the update field when we click on the update link.
        this.setState({ toBeUpdated: !this.state.toBeUpdated });
        // would be nice to set the text to the current one if update area is opened
						
        this.setState({
            id: this.props.id,
            index: this.props.index,
            answer: this.props.answer,
            solution: this.props.solution
        });
    }
	
    handleAnswerChange() {
		
		// had problems with that, state was always set too late
		// moved to handleTextChange and handleSolutionChange
		/*
        let id = this.props.uniqueID;
        //if question or hint changed, set it. if not, leave null and our PUT 
        //request will ignore it.
        let answer = this.state.answer;
        let solution = this.state.solution;
		
        let answerNode = { answer: answer, solution: solution };
        this.props.onAnswerChange(id, answerNode);
		*/
    }
	
    deleteAnswer(e) {
        e.preventDefault();
		
        let id = this.props.id;
        let index = this.state.index;
        let answer = this.props.answer;
        let solution = this.props.solution;

        let answerNode = { id: id, answer: answer, solution: solution };
        this.props.onAnswerDelete(index, answerNode);
    }
		
    handleTextChange(e) {
        this.setState({ answer: e.target.value });
		
		// had problems with that, state was always set too late
		//this.handleAnswerChange();
		
        let id = this.props.id;
        let index = this.state.index;
        let answer = e.target.value;
        let solution = this.state.solution;
		
        let answerNode = { id: id, answer: answer, solution: solution };
        this.props.onAnswerChange(index, answerNode);
    }
	
    handleSolutionChange(event: object, isInputChecked: boolean) {
        this.setState({ solution: isInputChecked });
		// had problems with that, state was always set too late
		//this.handleAnswerChange();
		
        let id = this.props.id;
        let index = this.state.index;
        let answer = this.state.answer;
        let solution = isInputChecked;
		
        let answerNode = { id: id, answer: answer, solution: solution };
        this.props.onAnswerChange(index, answerNode);
    }
	
	componentWillMount() {
		this.updateAnswer();
	}
		
    render() {
        return (
            <div style={{ zIndex: 12000, position: 'absolut' }}>  
				<table width="100%">
					<tbody>
						<tr>
							<td width="90%">
								<TextField 
									hintText="Enter answer text.."  
									floatingLabelText={"Answer " + (this.state.index + 1)}
									floatingLabelStyle={formStyle.floatingLabelStyle}
									floatingLabelFocusStyle={formStyle.floatingLabelFocusStyle} 
									underlineFocusStyle={formStyle.underlineFocusStyle} 
									value={ this.state.answer } 
									onChange={ this.handleTextChange } 
									style={formStyle.questionAnswerTextField} 
									fullWidth={true} 
								/>
							</td>
							<td width="5%">
								<Toggle
									label={"Solution"}
									labelStyle={formStyle.checkboxLabelStyle}
									defaultToggled={ this.state.solution } 
									onToggle={ this.handleSolutionChange } 
									style={formStyle.questionAnswerCheckBox}
								/>
							</td>
							<td width="5%">
								<Checkbox
									checkedIcon={<DeleteIcon />}
									uncheckedIcon={<DeleteIcon />}
									onTouchTap={this.deleteAnswer} 
									/>
							</td>
						</tr>
					</tbody>
				</table>
            </div>
        )
    }
}

export default QuestionAnswer;
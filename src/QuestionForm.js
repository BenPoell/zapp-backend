//QuestionForm.js
import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import SaveIcon from 'material-ui/svg-icons/content/save';
import QuestionIconSelect from './QuestionIconSelect';
import Question from './Question';

import IconButton from 'material-ui/IconButton';

import AutoRenewIcon from 'material-ui/svg-icons/action/autorenew';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';

import MenuItem from 'material-ui/MenuItem';
import listStyle from './styles/listStyles';
import formStyle from './styles/formStyles';
import QuestionLevelSelect from './QuestionLevelSelect';
import QuestionAnswerList from './QuestionAnswerList';
import {red500, blueGrey50, cyan400, grey600} from 'material-ui/styles/colors';

class QuestionForm extends Component {
    constructor(props) {
        super(props);
		
        this.state = {
            active: false,
            topic: '',
            level: '',
            scope: '',
            question: '',
            hint: '',
            answer: '',
			showAnswers: false
        };
		
        //binding all our functions to this class - otherwise you won't have the 'this' selector			
        this.handleActiveChange = this.handleActiveChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleScopeChange = this.handleScopeChange.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleHintChange = this.handleHintChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleAnswerDelete = this.handleAnswerDelete.bind(this);
        this.handleAnswerAdd = this.handleAnswerAdd.bind(this);
		
        this.handleShowAnswers = this.handleShowAnswers.bind(this);
		
        this.handleSubmit = this.handleSubmit.bind(this);
    }	
	
    handleSubmit(e) {
        e.preventDefault();
		
        let active = this.state.active;
        let level = this.state.level;
        let scope = this.state.scope;
        let question = this.state.question;
        let hint = this.state.hint;
        let answer = this.state.answer;
		
        if (!scope || !question) {
            return;
        }
		
        let questionNode = { active: active, level: level, scope: scope, question: question, hint: hint, answer: answer };
        this.props.onQuestionSubmit(questionNode);
        this.setState({
            active: false,
            topic: '',
            level: '',
            scope: '',
            question: '',
            hint: '',
            answer: '',
			showAnswers: false
        });
    }
	
    handleActiveChange(event: object, isInputChecked: boolean) {
        this.setState({ active: isInputChecked });
    }
	
    handleLevelChange(e) {
        this.setState({ level: e });
    }
	
    handleScopeChange(e) {
        this.setState({ scope: e.target.value });
    }
	
    handleQuestionChange(e) {
        this.setState({ question: e.target.value });
    }
	
    handleHintChange(e) {
        this.setState({ hint: e.target.value });
    }	
	
    handleAnswerChange(id, answer) {		
		for (var i = 0; i < this.state.answer.length; i++) 
		{
			if (this.state.answer[i]['id'] === id) 
			{	
				//does not work with setState()
				this.state.answer[i]['text'] = answer.answer;
				this.state.answer[i]['solution'] = answer.solution;
			}
		}		
    }
	
    handleAnswerDelete(id, answer) {	
		var idInt = parseInt(id, 10);
		
		for (var i = 0; i < this.state.answer.length; i++) 
		{
			var stateIdInt = parseInt(this.state.answer[i]['id'], 10);
			
			if (stateIdInt === idInt) 
			{	
				this.state.answer.splice(i, 1);
				break;
			}
		}
		
		// tried to renumber the answers, lol kidding me
		/*
		for (var i = 0; i < this.state.answer.length; i++) 
		{
			this.state.answer[i]['id'] = i + 1;
			
			console.log(this.state.answer[i]['id'] + ' - ' + this.state.answer[i]['text']);
		}
		*/
    }
	
    handleAnswerAdd() {	
		var newAnswer = { id: this.state.answer.length + 1, answer: 'New answer', solution: false };
	
		this.state.answer.push(newAnswer);
    }
	
    handleShowAnswers() {	
		if (this.state.answer.length === 0)
		{
			var newAnswer = { id: this.state.answer.length + 1, answer: 'New answer', solution: false };
		
			this.state.answer = new Array(newAnswer);				
		}
		
		this.setState({ showAnswers: !this.state.showAnswers });
	}

    render() {
        return (
            <div style={formStyle.QuestionFormContainer}>
				<form onSubmit={this.handleSubmit} style={formStyle.questionForm}>
					<Checkbox
						checkedIcon={<Visibility />}
						uncheckedIcon={<VisibilityOff/>}
						label="Active"  
						checked={ this.state.active } 
						onCheck={ this.handleActiveChange } 
						style={formStyle.questionCheckBox}
					/>
					<Divider/>
					<TextField 
						hintText="Enter the scope.."  
						floatingLabelText="Scope:" 
						floatingLabelStyle={formStyle.floatingLabelStyle}
						floatingLabelFocusStyle={formStyle.floatingLabelFocusStyle} 
						underlineFocusStyle={formStyle.underlineFocusStyle} 
						value={ this.state.scope } 
						onChange={ this.handleScopeChange } 
						style={formStyle.questionTextField} 
						fullWidth={true} 
					/>
					<TextField 
						hintText="Enter the question.."  
						floatingLabelText="Question:" 
						floatingLabelStyle={formStyle.floatingLabelStyle}
						floatingLabelFocusStyle={formStyle.floatingLabelFocusStyle} 
						underlineFocusStyle={formStyle.underlineFocusStyle} 
						value={ this.state.question }
						onChange={ this.handleQuestionChange } 
						style={formStyle.questionTextField} 
						fullWidth={true} 
						multiLine={true} 
						rows={1} 
						rowsMax={6} 
					/>
					<QuestionLevelSelect 
						question={this.state.question} 
						level={ this.state.level } 
						onLevelChange={ this.handleLevelChange }
					/>
					<TextField 
						hintText="Enter the hint.."  
						floatingLabelText="Hint:" 
						floatingLabelStyle={formStyle.floatingLabelStyle}
						floatingLabelFocusStyle={formStyle.floatingLabelFocusStyle} 
						underlineFocusStyle={formStyle.underlineFocusStyle} 
						value={ this.state.hint }
						onChange={ this.handleHintChange } 
						style={formStyle.questionTextField} 
						fullWidth={true} 
						multiLine={true} 
						rows={1} 
						rowsMax={4} 
					/>												
					<ListItem
						onTouchTap={this.handleShowAnswers}
						leftAvatar={
							<div>
								<Badge
									badgeStyle={listStyle.questionAvatarBadge}
									badgeContent={
										<IconButton 
											disableTouchRipple={true} 
										>{
											(this.state.showAnswers) ? <ArrowDropUp color={grey600}/> : <ArrowDropDown color={grey600}/>
										}
										</IconButton>
									}
								>
								</Badge>
							</div>
						}
						primaryText={
							(this.state.showAnswers) ? "Hide answers" : "Show answers"
						}
					/>
					{ (this.state.showAnswers)
						? 	( 
								<div>
									<MenuItem
										value="reorder" 
										leftIcon={<AutoRenewIcon color={cyan400}/>} 
										style={listStyle.answerReorderButton}
										onClick={this.handleAnswerReorder}
									>Reorder answers</MenuItem>	
									<QuestionAnswerList
										onAnswerChange={ this.handleAnswerChange } 
										onAnswerDelete={ this.handleAnswerDelete } 
										onAnswerAdd={ this.handleAnswerAdd } 
										questionId={this.props.uniqueID}
										answers={this.state.answer}
									/>
								</div>
							)
						: null
					}
					<RaisedButton
						label="Add Question"
						primary={true}
						icon={<SaveIcon />}
						style={formStyle.questionUpdateButton} 
						onTouchTap={this.handleSubmit}
					/>
				</form>
                <Subheader style={formStyle.questionSelectFieldSubHeader}>New Question Preview:</Subheader>				
                <Question
					active={this.state.active} 
					topic={this.state.topic}
					level={this.state.level}
					scope={this.state.scope}
					question={this.state.question}
					hint={this.state.hint}
					answer={this.state.answer}
					disabled={true}>
                >
                </Question> 
            </div>
        )
    }
}
export default QuestionForm;
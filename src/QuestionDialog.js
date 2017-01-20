//Comment.js
import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {ListItem} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import SaveIcon from 'material-ui/svg-icons/content/save';
import AccountingIcon from 'material-ui/svg-icons/action/account-balance';
import TimeIcon from 'material-ui/svg-icons/action/alarm';
import SocialIcon from 'material-ui/svg-icons/action/face';
import SocialGroupIcon from 'material-ui/svg-icons/social/group';
import SecurityIcon from 'material-ui/svg-icons/action/fingerprint';
import SecurityLockIcon from 'material-ui/svg-icons/action/lock';
import MoneyIcon from 'material-ui/svg-icons/action/euro-symbol';
import StatisticIcon from 'material-ui/svg-icons/av/art-track';
import StatisticBarIcon from 'material-ui/svg-icons/av/equalizer';
import WebIcon from 'material-ui/svg-icons/av/web';
import BusinessIcon from 'material-ui/svg-icons/communication/business';
import CommunicationIcon from 'material-ui/svg-icons/communication/comment';
import MobileIcon from 'material-ui/svg-icons/communication/stay-current-portrait';
import MobileSecurityIcon from 'material-ui/svg-icons/communication/phonelink-lock';
import MobileSetupIcon from 'material-ui/svg-icons/communication/phonelink-setup';

import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';

import listStyle from './styles/listStyles';
import formStyle from './styles/formStyles';
import QuestionLevelSelect from './QuestionLevelSelect';
import QuestionAnswerList from './QuestionAnswerList';
import {blueGrey50, grey600} from 'material-ui/styles/colors';

// for the letter / icon Avatar
let icons = []
icons['Accounting'] = <AccountingIcon color={blueGrey50}/>
icons['Time'] = <TimeIcon color={blueGrey50}/>
icons['Social'] = <SocialIcon color={blueGrey50}/>
icons['Social Group'] = <SocialGroupIcon color={blueGrey50}/>
icons['Security'] = <SecurityIcon color={blueGrey50} />
icons['Security Lock'] = <SecurityLockIcon color={blueGrey50}/>
icons['Statistic'] = <StatisticIcon color={blueGrey50}/>
icons['Statistic Bar"'] = <StatisticBarIcon color={blueGrey50}/>
icons['Web'] = <WebIcon color={blueGrey50}/>
icons['Business'] = <BusinessIcon color={blueGrey50}/>
icons['Money'] = <MoneyIcon color={blueGrey50}/>
icons['Communication'] = <CommunicationIcon color={blueGrey50}/>
icons['Mobile'] = <MobileIcon color={blueGrey50}/>
icons['Mobile Security'] = <MobileSecurityIcon color={blueGrey50}/>
icons['Mobile Setup'] = <MobileSetupIcon color={blueGrey50}/>

class QuestionDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: '',
			id: '',
            active: false,
            topic: '',
            level: '',
            scope: '',
            question: '',
            hint: '',
            answer: '',
			showAnswers: false,
			title: 'Question'
        };
        //binding all our functions to this class - otherwise you won't have the 'this' selector
        this.handleQuestionDelete = this.handleQuestionDelete.bind(this);
		
        this.handleQuestionInsertOrUpdate = this.handleQuestionInsertOrUpdate.bind(this);
        this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
        this.handleQuestionInsert = this.handleQuestionInsert.bind(this);
		
        this.handleActiveChange = this.handleActiveChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleScopeChange = this.handleScopeChange.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleHintChange = this.handleHintChange.bind(this);
        this.handleAnswersChange = this.handleAnswersChange.bind(this);
		
        this.handleShowAnswers = this.handleShowAnswers.bind(this);
    }

    handleQuestionDelete(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        let active = this.props.active;
        let question = this.props.question;
        let answer = this.props.answer;
        let topic = this.props.topic;
        let level = this.props.level;
        let scope = this.props.scope;
        let hint = this.props.hint;
		
        let questionNode = { id: id, active: active, topic: topic, level: level, scope: scope, question: question, hint: hint, answer: answer };
         // before you go further -> ask user with a dialog and send data with it
        PubSub.publish( 'showQuestionDeleteDialog', questionNode );
    }
	
	handleQuestionInsertOrUpdate(e) {
		if(this.state.open === 'insert')
		{
			this.handleQuestionInsert(event)
		}
		else if(this.state.open === 'update')
		{
			this.handleQuestionUpdate(event)
		}		
	}
	
    handleQuestionUpdate(e) {
        e.preventDefault();
        let id = this.state.id;
        //if question or hint changed, set it. if not, leave null and our PUT 
        //request will ignore it.
        let active = (this.state.active) ? this.state.active : false;
        let topic = (this.state.topic) ? this.state.topic : null;
        let level = (this.state.level) ? this.state.level : null;
        let scope = (this.state.scope) ? this.state.scope : null;
        let question = (this.state.question) ? this.state.question : null;
        let hint = (this.state.hint) ? this.state.hint : null;
        let answer = (this.state.answer) ? this.state.answer : null;
		
        let questionNode = { active: active, topic: topic, level: level, scope: scope, question: question, hint: hint, answer: answer };
		
        this.props.onQuestionUpdate(id, questionNode);
		this.props.onClose();
		
        this.setState({
            open: '',
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
	
    handleQuestionInsert(e) {
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
        this.props.onQuestionInsert(questionNode);
		this.props.onClose();
		
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
	
    handleAnswersChange(answers) {	
        this.setState({ answer: answers });
    }
	
    handleShowAnswers() {
		this.setState({ showAnswers: !this.state.showAnswers });
	}

	componentWillReceiveProps(props) {		
		if (props.open !== this.state.open) { 
			this.setState({
				open: props.open,
				id: props.uniqueID,
				active: props.active,
				topic: props.topic,
				level: props.level,
				scope: props.scope,
				question: props.question,
				hint: props.hint,
				answer: props.answer,
				showAnswers: false
			});
			
			if (props.open === 'update')
			{
				this.setState({ title: 'Update Question' });
			} 
			else if (props.open === 'insert')
			{
				this.setState({ title: 'Insert Question' });				
			}
			else
			{
				this.setState({ title: 'Question' });						
			}
		}
	}
	
    render() {
		const actions = [
		  <FlatButton
			label="Cancel"
			primary={true}
			onTouchTap={this.props.onClose}
		  />,
		  <RaisedButton
			label={ this.state.title }
			primary={true}
			icon={<SaveIcon />}
			style={formStyle.questionUpdateButton} 
			onTouchTap={this.handleQuestionInsertOrUpdate}
		  />,
		];
		
        return (
			<Dialog
				title={ this.state.title }
				modal={false}
				open={this.props.open === '' ? false : true}
				onRequestClose={this.handleClose}
				autoScrollBodyContent={true}
				actions={actions}
				>
				<form onSubmit={this.handleQuestionUpdate} style={formStyle.questionForm}>
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
					<QuestionLevelSelect question={this.state.question} level={ this.state.level } onLevelChange={ this.handleLevelChange }/>
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
									<QuestionAnswerList
										onAnswersChange={ this.handleAnswersChange } 
										questionId={this.props.uniqueID}
										answers={this.state.answer}
									/>
								</div>
							)
						: null
					}
					<Divider/>
				</form>
			</Dialog>
        )
    }
}

export default QuestionDialog;
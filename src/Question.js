//Comment.js
import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {ListItem} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import IconMenu from 'material-ui/IconMenu';
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

import listStyle from './styles/listStyles';

import QuestionDialog from './QuestionDialog';

import {red500, blueGrey50, cyan400, grey600} from 'material-ui/styles/colors';

//import marked from 'marked';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Options"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={listStyle.grey600} />
  </IconButton>
);

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

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: '',
            active: false,
            topic: '',
            level: '',
            scope: '',
            question: '',
            hint: '',
            answer: ''
        };
        //binding all our functions to this class - otherwise you won't have the 'this' selector
        this.handleOpenQuestionUpdate = this.handleOpenQuestionUpdate.bind(this);
		
        this.handleClose = this.handleClose.bind(this);
		
        this.handleQuestionDelete = this.handleQuestionDelete.bind(this);
				
        this.optionTapped = this.optionTapped.bind(this);
    }
	
    optionTapped(event: object, child: object) { 
	
		if (child != null)
		{
			if(child.props.value === 'delete')
			{
				this.handleQuestionDelete(event)
			}
			else if(child.props.value === 'edit')
			{
				this.handleOpenQuestionUpdate(event)
			}
			else if(child.props.value === 'insert')
			{
				this.handleOpenQuestionInsert(event)
			}
		}
		else
		{			
			this.handleOpenQuestionUpdate(event)
		}
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
	
    handleOpenQuestionUpdate(e) {
        e.preventDefault();
        //brings up the update field when we click on the update link.
        //this.setState({ open: 'update' });
        // would be nice to set the text to the current one if update area is opened
		
        this.setState({
			key: this.props.uniqueID,
            active: this.props.active,
            topic: this.props.topic,
            level: this.props.level,
            scope: this.props.scope,
            question: this.props.question,
            hint: this.props.hint,
            answer: this.props.answer
        });
		
		this.setState({ open: 'update' });
    }
		
	handleClose = () => {
		this.setState({open: ''});
	};
	
    render() {
        return (
            <div>
                <Divider/>
                <Paper zDepth={2}>
                    <ListItem
                        disabled={(this.props.disabled) ? this.props.disabled : false}
                        leftAvatar={
							<div style={listStyle.questionAvatarBadgeWrapper}>
								<Badge
									badgeStyle={listStyle.questionAvatarBadge}
									badgeContent={
										<IconButton 
											disableTouchRipple={true} 
											tooltipPosition="bottom-right" 
											tooltip={(this.props.active) ? "Active" : "Inactive"}
										>{
											(this.props.active) ? <Visibility color={cyan400}/> : <VisibilityOff color={grey600}/>
										}
										</IconButton>
									}
								>
								</Badge>
							</div>
                        }
                        rightIconButton={ 
                            (!this.props.disabled) ?                       
								(<IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.optionTapped}>
									<MenuItem 
										value="edit" 
										primaryText="Edit" 
										leftIcon={<EditIcon />}
									/>
									<MenuItem
										primaryText="Remove " 
										value="delete" 
										leftIcon={<DeleteIcon color={red500}/>} 
										style={{color: 'red'}}
									/>
								</IconMenu>)
                            : null
                        }
                        primaryText={
						<p style={listStyle.questionPrimaryEllipsis}>
							{this.props.scope}
						</p>
						}
                        secondaryText={
                        <p>
                            {this.props.question}
                        </p>
                        }
                        secondaryTextLines={2} 
						onTouchTap={this.optionTapped}
                    />
                </Paper>
				<QuestionDialog 
					onQuestionUpdate={this.props.onQuestionUpdate} 
					onClose={this.handleClose}
					open={this.state.open}
					uniqueID={this.props.uniqueID}
					key={this.props.uniqueID}
					active={this.state.active} 
					topic={this.state.topic}
					level={this.state.level}
					scope={this.state.scope}
					question={this.state.question}
					hint={this.state.hint}
					answer={this.state.answer}
					/>
            </div>
        )
    }
}

export default Question;
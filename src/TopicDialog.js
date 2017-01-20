//Comment.js
import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

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

import formStyle from './styles/formStyles';
import TopicIconSelect from './TopicIconSelect';
import {blueGrey50} from 'material-ui/styles/colors';

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

class Topic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: '',
            name: '',
            description: '',
            active: false,
            icon: ''
        };
        //binding all our functions to this class - otherwise you won't have the 'this' selector
		
        this.handleTopicInsertOrUpdate = this.handleTopicInsertOrUpdate.bind(this);
        this.handleTopicUpdate = this.handleTopicUpdate.bind(this);
        this.handleTopicInsert = this.handleTopicInsert.bind(this);
		
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleActiveChange = this.handleActiveChange.bind(this);
        this.handleIconChange = this.handleIconChange.bind(this);
    }	
	
	handleTopicInsertOrUpdate(e) {
		if(this.state.open === 'insert')
		{
			this.handleTopicInsert(event)
		}
		else if(this.state.open === 'update')
		{
			this.handleTopicUpdate(event)
		}		
	}
	
    handleTopicUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        //if name or description changed, set it. if not, leave null and our PUT 
        //request will ignore it.
        let name = (this.state.name) ? this.state.name : null;
        let description = (this.state.description) ? this.state.description : null;
        let active = (this.state.active) ? this.state.active : false;
        let icon = (this.state.icon) ? this.state.icon : null;

        let topic = { name: name, description: description, active: active, icon: icon};
        this.props.onTopicUpdate(id, topic);
		this.props.onClose();
		
        this.setState({
            open: '',
            name: '',
            description: '',
            active: false,
            icon: ''
        })
    }
	
    handleTopicInsert(e) {
        e.preventDefault();
        let name = this.state.name.trim();
        let description = this.state.description.trim();
        let icon = this.state.icon;
        let active = this.state.active;
        if (!description || !name) {
            return;
        }
        this.props.onTopicInsert({ name: name, description: description, icon: icon, active: active });
		this.props.onClose();
		
        this.setState({ name: '', description: '', icon: null, active: false });
    }
	
    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }
    handleActiveChange(event: object, isInputChecked: boolean) {
        this.setState({ active: isInputChecked });
    }
    handleIconChange(payload) {
        this.setState({ icon: payload });
    }
	
	componentWillReceiveProps(props) {		
		if (props.open !== this.state.open) { 
			this.setState({
				open: props.open,
				id: props.uniqueID,
				active: props.active,
				name: props.name,
				description: props.description,
				icon: props.icon
			});
			
			if (props.open === 'update')
			{
				this.setState({ title: 'Update Topic' });
			} 
			else if (props.open === 'insert')
			{
				this.setState({ title: 'Insert Topic' });				
			}
			else
			{
				this.setState({ title: 'Topic' });						
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
			onTouchTap={this.handleTopicInsertOrUpdate}
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
				<form onSubmit={this.handleTopicUpdate} style={formStyle.topicForm}>
					<Checkbox
						checkedIcon={<Visibility />}
						uncheckedIcon={<VisibilityOff/>}
						label="Active"  
						checked={ this.state.active } 
						onCheck={ this.handleActiveChange } 
						style={formStyle.topicCheckBox}
					/>
					<Divider/>
					<TopicIconSelect name={this.state.name} icon={ this.state.icon } onIconChange={ this.handleIconChange }/>
					<TextField 
						hintText="Enter name.."  
						floatingLabelText="Topic Name:" 
						floatingLabelStyle={formStyle.floatingLabelStyle}
						floatingLabelFocusStyle={formStyle.floatingLabelFocusStyle} 
						underlineFocusStyle={formStyle.underlineFocusStyle} 
						value={ this.state.name } 
						onChange={ this.handleNameChange } 
						style={formStyle.topicTextField} 
						fullWidth={true} 
					/>
					<TextField 
						hintText="Enter the description.."  
						floatingLabelText="Topic Description:" 
						floatingLabelStyle={formStyle.floatingLabelStyle}
						floatingLabelFocusStyle={formStyle.floatingLabelFocusStyle} 
						underlineFocusStyle={formStyle.underlineFocusStyle} 
						value={ this.state.description }
						onChange={ this.handleDescriptionChange } 
						style={formStyle.topicTextField} 
						fullWidth={true} 
						multiLine={true} 
						rows={2} 
						rowsMax={4} 
					/>
				</form>
            </Dialog>
        )
    }
}

export default Topic;
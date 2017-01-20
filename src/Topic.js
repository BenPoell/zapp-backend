//Comment.js
import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {ListItem} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

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

import MenuItem from 'material-ui/MenuItem';
import listStyle from './styles/listStyles';
import TopicAvatar from './TopicAvatar';
import TopicDialog from './TopicDialog';

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
        this.handleTopicDelete = this.handleTopicDelete.bind(this);
        this.handleOpenTopicUpdate = this.handleOpenTopicUpdate.bind(this);
		
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleActiveChange = this.handleActiveChange.bind(this);
        this.handleIconChange = this.handleIconChange.bind(this);
		
        this.optionTapped = this.optionTapped.bind(this);
    }
	
    optionTapped(event: object, child: object) { 	
		if (child != null)
		{
			if(child.props.value === 'delete')
			{
				this.handleTopicDelete(event)
			}
			else if(child.props.value === 'edit')
			{
				this.handleOpenTopicUpdate(event)
			}
			else if(child.props.value === 'insert')
			{
				this.handleOpenTopicInsert(event)
			}
		}
		else
		{			
			this.handleOpenTopicUpdate(event)
		}
    }	
	
    handleOpenTopicUpdate(e) {
        e.preventDefault();
        //brings up the update field when we click on the update link.
        //this.setState({ open: 'update' });
        // would be nice to set the text to the current one if update area is opened
		
        this.setState({
			name: this.props.name,
            description: this.props.description,
            active: this.props.active,
            icon: this.props.icon
        });
		
		this.setState({ open: 'update' });
    }
	
    handleTopicDelete(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        let name = this.props.name
        let description = this.props.description
        let icon = this.props.icon
        let active = this.props.active

         // before you go further -> ask user with a dialog and send data with it
        PubSub.publish( 'showTopicDeleteDialog', {name: name, id: id, description: description, active: active, icon: icon} );
    }	
		
	handleClose = () => {
		this.setState({open: ''});
	};	
	
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
	
    render() {
        return (
            <div>
                <Divider/>
                <Paper zDepth={2}>
                    <ListItem
                        disabled={(this.props.disabled) ? this.props.disabled : false}
                        leftAvatar={
                        <div style={listStyle.topicAvatarBadgeWrapper}>
                            <Badge
                            badgeStyle={listStyle.topicAvatarBadge}
                            badgeContent={<IconButton disableTouchRipple={true} tooltipPosition="bottom-right" tooltip={(this.props.active) ? "Active" : "Inactive"}>{(this.props.active) ? <Visibility color={cyan400}/> : <VisibilityOff color={grey600}/>}</IconButton>}
                            >
                                <TopicAvatar content={(icons[`${this.props.icon}`]) ? icons[`${this.props.icon}`] : this.props.name_short}/>
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
                        primaryText={<p style={listStyle.topicPrimaryEllipsis}>{this.props.name}</p>}
                        secondaryText={
                        <p>
                            {this.props.description}
                        </p>
                        }
                        secondaryTextLines={2} 
                        onTouchTap={this.optionTapped}
                    />
                </Paper>
                <TopicDialog 
					onTopicUpdate={ this.props.onTopicUpdate } 
					onClose={this.handleClose}
					open={this.state.open}
					uniqueID={ this.props.uniqueID }
					key={ this.props.uniqueID }
					active={this.state.active} 
					icon={this.state.icon}
					name={ this.state.name }
					description={ this.state.description }>
                </TopicDialog> 
            </div>
        )
    }
}

export default Topic;
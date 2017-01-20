import React, {Component} from 'react';
//import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import TopicAvatar from './TopicAvatar';
import formStyle from './styles/formStyles';

import AccountingIcon from 'material-ui/svg-icons/action/account-balance';
import TimeIcon from 'material-ui/svg-icons/action/alarm';
import SocialIcon from 'material-ui/svg-icons/action/face';
import SocialGroupIcon from 'material-ui/svg-icons/social/group';
import SecurityIcon from 'material-ui/svg-icons/action/fingerprint';
import SecurityLockIcon from 'material-ui/svg-icons/action/lock';
import MoneyIcon from 'material-ui/svg-icons/action/euro-symbol';
import StatisticIcon from 'material-ui/svg-icons/av/art-track';
import StatisticBarIcon from 'material-ui/svg-icons/social/poll';
import WebIcon from 'material-ui/svg-icons/av/web';
import BusinessIcon from 'material-ui/svg-icons/communication/business';
import CommunicationIcon from 'material-ui/svg-icons/communication/comment';
import MobileIcon from 'material-ui/svg-icons/communication/stay-current-portrait';
import MobileSecurityIcon from 'material-ui/svg-icons/communication/phonelink-lock';
import MobileSetupIcon from 'material-ui/svg-icons/communication/phonelink-setup';

import {blueGrey50} from 'material-ui/styles/colors';

// for the letter / icon Avatar

let avatarIcons = []
avatarIcons['Accounting'] = <AccountingIcon color={blueGrey50}/>
avatarIcons['Time'] = <TimeIcon color={blueGrey50}/>
avatarIcons['Social'] = <SocialIcon color={blueGrey50}/>
avatarIcons['Social Group'] = <SocialGroupIcon color={blueGrey50}/>
avatarIcons['Security'] = <SecurityIcon color={blueGrey50} />
avatarIcons['Security Lock'] = <SecurityLockIcon color={blueGrey50}/>
avatarIcons['Statistic'] = <StatisticIcon color={blueGrey50}/>
avatarIcons['Statistic Bar'] = <StatisticBarIcon color={blueGrey50}/>
avatarIcons['Web'] = <WebIcon color={blueGrey50}/>
avatarIcons['Business'] = <BusinessIcon color={blueGrey50}/>
avatarIcons['Money'] = <MoneyIcon color={blueGrey50}/>
avatarIcons['Communication'] = <CommunicationIcon color={blueGrey50}/>
avatarIcons['Mobile'] = <MobileIcon color={blueGrey50}/>
avatarIcons['Mobile Security'] = <MobileSecurityIcon color={blueGrey50}/>
avatarIcons['Mobile Setup'] = <MobileSetupIcon color={blueGrey50}/>

const items = [];
// null item
items.push(<MenuItem value={null} key={null} primaryText={`None`} />);
// !!!!!!!! get items from database later !!!!!!!!!!!!
let icons = []
icons.push({icon: <AccountingIcon/>, text:"Accounting"});
icons.push({icon: <TimeIcon/>, text:"Time"});
icons.push({icon: <SocialIcon/>, text:"Social"});
icons.push({icon: <SocialGroupIcon/>, text:"Social Group"});
icons.push({icon: <SecurityIcon/>, text:"Security"});
icons.push({icon: <SecurityLockIcon/>, text:"Security Lock"});
icons.push({icon: <StatisticIcon/>, text:"Statistic"});
icons.push({icon: <StatisticBarIcon/>, text:"Statistic Bar"});
icons.push({icon: <WebIcon/>, text:"Web"});
icons.push({icon: <BusinessIcon/>, text:"Business"});
icons.push({icon: <MoneyIcon/>, text:"Money"});
icons.push({icon: <CommunicationIcon/>, text:"Communication"});
icons.push({icon: <MobileIcon/>, text:"Mobile"});
icons.push({icon: <MobileSecurityIcon/>, text:"Mobile Security"});
icons.push({icon: <MobileSetupIcon/>, text:"Mobile Setup"});

for (let i = 0; i < icons.length; i++ ) {
  items.push(<MenuItem leftIcon={icons[i]['icon']} value={icons[i]['text']} key={i} primaryText={icons[i]['text']} />);
}

/**
 * `DropDown Menu` can also be nullable. In this case, just specify a `MenuItem`
 * with no text and with a `null` value. For instance, for a boolean:
 */
class TopicIconSelect extends Component {
    state = {
    value: (this.props.icon) ? (this.props.icon) : null
  };

  handleChange = (event: object, key: number, payload: any) => {
    this.setState({ value: payload });
    this.props.onIconChange(payload);
  };

  render() {
    return (
    <div>
      <Subheader style={formStyle.topicSelectFieldSubHeader}>Topic Icon:</Subheader>
      <div style={formStyle.topicAvatarContainerDiv}>
        <TopicAvatar content={(avatarIcons[`${this.state.value}`]) 
			? avatarIcons[`${this.state.value}`] 
			: this.props.name ? (this.props.name.split(' ')[0].substr(0,1).toUpperCase() + (this.props.name.split(' ').length >= 2 ? this.props.name.split(' ')[1].substr(0,1).toUpperCase() : '')) : '' }/>
      </div>
      <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
          style={formStyle.topicIconDropDownMenu}
          underlineStyle={formStyle.topicIconDropDownMenuUnderLineStyle}
          maxHeight={200}
        >
        {items}
      </DropDownMenu>
      <Divider style={formStyle.topicIconSelectDivider}/>
    </div>
    );
  }
}

export default TopicIconSelect
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/Toggle';
//import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import LoginIcon from 'material-ui/svg-icons/action/exit-to-app';
import StudyArea from 'material-ui/svg-icons/social/school';
import UserArea from 'material-ui/svg-icons/action/account-circle';
import StatArea from 'material-ui/svg-icons/social/poll';
import AppIcon from 'material-ui/svg-icons/action/settings';
import {ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
//import Toggle from 'material-ui/Toggle';
import overallStyle from './styles/overallStyles';
import {cyan600} from 'material-ui/styles/colors';

// build upon that when we have use integration
class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
        <IconButton tooltip="Login">
          <LoginIcon color={'#FFFFFF'}/>
        </IconButton>
    );
  }
}

class Logged extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        }
      >
        <MenuItem primaryText="Account" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }
}

Logged.muiName = 'IconMenu';

class ZappAppBar extends Component {
  state = {
    //logged: false,
  };

  handleChange = (event, logged) => {
    console.log(logged)
    this.setState({logged: !logged});
  };

/*
        <Toggle
          label="Logged"
          defaultToggled={true}
          onToggle={this.handleChange}
          labelPosition="right"
          labelStyle={{color: 'black'}}
        />

        {this.state.logged ? <Login /> : <Logged />}
        */


  render() {
    return (
      <div>
        <AppBar
          title="Zapp - Backend"
          iconElementLeft={
            <IconButton>
              <AppIcon />
            </IconButton>
          }
          iconElementRight={
            <ToolbarGroup firstChild={true}>        
            <RaisedButton style={overallStyle.appBarButton} icon={<StudyArea/>} label="Study" primary={true} />
            <RaisedButton style={overallStyle.appBarButton} icon={<UserArea/>} label="User" primary={true} />
            <RaisedButton style={overallStyle.appBarButton} icon={<StatArea/>} label="Statistics" primary={true} />
            <ToolbarSeparator />
            <Login />
            </ToolbarGroup>
          } 
          zDepth={2}
          style={{backgroundColor: cyan600}}
        />
      </div>
    );
  }
}

export default ZappAppBar;
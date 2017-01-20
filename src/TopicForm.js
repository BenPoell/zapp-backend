//TopicForm.js
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import formStyle from './styles/formStyles';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import SaveIcon from 'material-ui/svg-icons/content/save';
import TopicIconSelect from './TopicIconSelect';
import Topic from './Topic';

class TopicForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', description: '', icon: null, active: false};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleActiveChange = this.handleActiveChange.bind(this);
        this.handleIconChange = this.handleIconChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit(e) {
        e.preventDefault();
        let name = this.state.name.trim();
        let description = this.state.description.trim();
        let icon = this.state.icon;
        let active = this.state.active;
        if (!description || !name) {
            return;
        }
        this.props.onTopicSubmit({ name: name, description: description, icon: icon, active: active });
        this.setState({ name: '', description: '', icon: null, active: false });
    }

    render() {
        return (
            <div style={formStyle.TopicFormContainer}>
                <form onSubmit={this.handleSubmit} style={formStyle.topicForm}>
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
                    hintText="Enter the name of the topic.."  
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
                    hintText="Enter some describing info about the topic.."  
                    floatingLabelText="Topic Description:" 
                    floatingLabelStyle={formStyle.floatingLabelStyle}
                    floatingLabelFocusStyle={formStyle.floatingLabelFocusStyle} 
                    underlineFocusStyle={formStyle.underlineFocusStyle} 
                    value={ this.state.description }
                    onChange={ this.handleDescriptionChange } 
                    style={formStyle.topicTextField} 
                    fullWidth={true} 
                    multiLine={true} 
                    rows={1} 
                    rowsMax={2} 
                    />
                    <RaisedButton
                    label="Add Topic"
                    primary={true}
                    icon={<SaveIcon />}
                    style={formStyle.topicSaveButton} 
                    onTouchTap={this.handleSubmit}
                    />
                </form>
                <Subheader style={formStyle.topicSelectFieldSubHeader}>New Topic Preview:</Subheader>
                <Topic 
                active={this.state.active} 
                icon={this.state.icon}
                name={this.state.name}
                name_short={this.state.name.split(' ')[0].substr(0,1).toUpperCase() + (this.state.name.split(' ').length >= 2 ? this.state.name.split(' ')[1].substr(0,1).toUpperCase() : '')}
                description={this.state.description} 
                disabled={true}>
                </Topic> 
            </div>
        )
    }
}
export default TopicForm;
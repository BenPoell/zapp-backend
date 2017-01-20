import React, {Component} from 'react';
//import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import topicSelectStyle from './styles/topicSelectStyles';
import SelectField from 'material-ui/SelectField';
var items = [];

/**
 * `DropDown Menu` can also be nullable. In this case, just specify a `MenuItem`
 * with no text and with a `null` value. For instance, for a boolean:
 */
class QuestionTopicSelect extends Component {
    state = {
		topics: (this.props.topics) ? (this.props.topics) : null,
		name: (this.props.name) ? (this.props.name) : null,
		id: (this.props.id) ? (this.props.id) : null
	};
	
	
	constructor(props) {
        super(props);
		
		this.setTopics = this.setTopics.bind(this);
    }
	
	handleChange = (event: object, key: any, name: any) => {
		this.setState({ id: key, name: name });
		this.props.onTopicChange(items[key].key);
	}
	
	setTopics() {
		var counter = 0;
		
		if (this.state.topics !== this.props.topics)
		{       
			let topics = this.state.topics;
			let newTopics = this.props.topics;
			
			items = [];
			
			this.setState({ topics: newTopics });
			
			for (let i = 0; i < newTopics.length; i++ ) 
			{
				counter++;
				
				let topic = newTopics[i];
				var push = true;
				
				let menuItem = <MenuItem value={topic.name} key={topic._id} primaryText={topic.name} />;
				/*
				for (let j = 0; j < items.length; j++ ) 
				{		
					if (items[j].key === topic._id)
					{				
						push = false;
						break;
					}
					else
					{
						push = true;
					}
				}
				if (push === true)
				{
					items.push(menuItem);
				}
				*/
				items.push(menuItem);
				
				// this sets the first topic as filter
				if (counter === 1 && this.state.name == null)
				{
					this.setState({ id: topic._id, name: topic.name });
					this.props.onTopicChange(topic._id);
				}
			}
		}
    }
	
	componentWillReceiveProps() {
		this.setTopics();
		//this.props.onTopicChange(this.state.id);
	}

	render() {
		return (
			<SelectField 
				floatingLabelText="Select Topic Filter"
				key={this.state.id}
				value={this.state.name}
				onChange={this.handleChange}
				style={topicSelectStyle.SelectField}
				labelStyle={topicSelectStyle.SelectFieldLabel}
				floatingLabelStyle={topicSelectStyle.SelectFieldFloatingLabel}
				underlineStyle={topicSelectStyle.SelectFieldUnderline}
				underlineFocusStyle={topicSelectStyle.SelectFieldUnderline}
				underlineDisabledStyle={topicSelectStyle.SelectFieldUnderline}
			>
			{items}
			</SelectField>
		);
	}
}

export default QuestionTopicSelect
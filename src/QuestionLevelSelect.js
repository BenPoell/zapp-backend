import React, {Component} from 'react';
//import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import formStyle from './styles/formStyles';

const items = [];
// null item
items.push(<MenuItem value={'easy'} key={1} primaryText={'Easy'} />);
items.push(<MenuItem value={'middle'} key={2} primaryText={'Middle'} />);
items.push(<MenuItem value={'hard'} key={3} primaryText={'Hard'} />);

/**
 * `DropDown Menu` can also be nullable. In this case, just specify a `MenuItem`
 * with no text and with a `null` value. For instance, for a boolean:
 */
class QuestionLevelSelect extends Component {
    state = {
    value: (this.props.level) ? (this.props.level) : null
  };

  handleChange = (event: object, key: number, level: any) => {
	this.setState({ value: level });
    this.props.onLevelChange(level);
  };

  render() {
    return (
    <div>
      <Subheader style={formStyle.questionLevelSelectFieldSubHeader}>Level:</Subheader>
      <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
          style={formStyle.questionLevelDropDownMenu}
          underlineStyle={formStyle.questionLevelDropDownMenuUnderLineStyle}
          maxHeight={200}
        >
        {items}
      </DropDownMenu>
      <Divider style={formStyle.questionLevelSelectDivider}/>
    </div>
    );
  }
}

export default QuestionLevelSelect
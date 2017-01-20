import {grey200, grey600, red500, white} from 'material-ui/styles/colors';

//form element styles
const topicSelectStyle = {
    SelectField: {
		textAlign: 'left',
		marginBottom: '10px',
        color: red500,
		opacity: 1.0,
		width: '200%'
    },
    SelectFieldLabel: {
		color: grey200,
		opacity: 1.0,
		textAlign: 'left'
    },
    SelectFieldUnderline: {
        color: red500,
		backgroundColor: red500
    },
	SelectFieldFloatingLabel: {
		color: grey200,
		textAlign: 'left'
    },
	FloatingActionButton: {
		marginRight: '10px'
	}
	
}
module.exports = topicSelectStyle;

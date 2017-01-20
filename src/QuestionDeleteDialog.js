import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import overallStyle from './styles/overallStyles';
import Question from './Question';

/**
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class QuestionDeleteDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
			id: '',
            active: false,
            topic: '',
            level: '',
            scope: '',
            question: '',
            hint: '',
            answer: ''
        };
    }

    // function that opens the dialog via PubSub
    handleOpen = (msg, data) => {
        this.setState({
            open: true,
			id: data.id,
            active: data.active,
            topic: data.topic,
            level: data.level,
            scope: data.scope,
            question: data.question,
            hint: data.hint,
            answer: data.answer
        });    
    }

    handleClose = () => {
        this.setState({open: false});
    };

    handleConfirm = () => {
        // call the questionBox Delete function
        this.props.onQuestionDelete(this.state.id);
        this.setState({open: false});
    };

    componentDidMount() {
        // set message and show the Dialog when called per PubSub
        PubSub.subscribe( 'showQuestionDeleteDialog' , this.handleOpen);
    }

    render() {
    const actions = [
        <FlatButton
			label="Cancel"
			primary={true}
			onTouchTap={this.handleClose}
        />,
        <FlatButton
			label="Confirm"
			primary={true}
			keyboardFocused={true}
			onTouchTap={this.handleConfirm}
        />,
    ];

    return (
        <div>
            <Dialog
                title="Delete Question"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <div style={overallStyle.DialogDeleteTextDiv}>{`Please confirm to delete the following Question: `}</div>               
                <Question
					active={this.state.active} 
					topic={this.state.topic}
					level={this.state.level}
					scope={this.state.scope}
					question={this.state.question}
					hint={this.state.hint}
					answer={this.state.answer}
					disabled={true}>
                >
                </Question> 
            </Dialog>
        </div>
    );
    }
}
export default QuestionDeleteDialog;
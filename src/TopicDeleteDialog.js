import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import overallStyle from './styles/overallStyles';
import Topic from './Topic';

/**
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class TopicDeleteDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: '',
            id: null,
            description: '',
            active: false,
            icon: ''
        };
    }

    // function that opens the dialog via PubSub
    handleOpen = (msg, data) => {
        this.setState({
            open: true,
            name: data.name,
            id: data.id,
            description: data.description,
            active: data.active,
            icon: data.icon
        });    
    }

    handleClose = () => {
        this.setState({open: false});
    };

    handleConfirm = () => {
        // call the topicBox Delete function
        this.props.onTopicDelete(this.state.id);
        this.setState({open: false});
    };

    componentDidMount() {
        // set message and show the Dialog when called per PubSub
        PubSub.subscribe( 'showTopicDeleteDialog' , this.handleOpen);
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
                title="Delete Topic"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <div style={overallStyle.DialogDeleteTextDiv}>{`Please confirm to delete the following Topic: `}</div>
                <Topic 
                active={this.state.active} 
                icon={this.state.icon}
                name={this.state.name}
                name_short={this.state.name.split(' ')[0].substr(0,1).toUpperCase() + (this.state.name.split(' ').length >= 2 ? this.state.name.split(' ')[1].substr(0,1).toUpperCase() : '')}
                description={this.state.description} 
                disabled={true}>
                </Topic> 
            </Dialog>
        </div>
    );
    }
}
export default TopicDeleteDialog;
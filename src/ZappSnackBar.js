import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import PubSub from 'pubsub-js';
import overallStyle from './styles/overallStyles';

class ZappSnackBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            open: false
        };

        // binding of functions so they can be accessed with this keyword
        this.handleSnackBarOpening = this.handleSnackBarOpening.bind(this);
    }

    handleSnackBarOpening(msg, data) {
        this.setState({
            open: true,
            message: data
        });    
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    componentDidMount() {
        // set message and show the Snackbar when called per PubSub
        PubSub.subscribe( 'showSnackbarWithMessage' , this.handleSnackBarOpening);
    }

    render() {
        return (
            <Snackbar
                open={this.state.open}
                message={this.state.message}
                //action="undo"
                autoHideDuration={3500}
                onRequestClose={this.handleRequestClose}
                bodyStyle={ overallStyle.ZappSnackBarBodyStyle}
            />
        );
    }
}

export default ZappSnackBar;
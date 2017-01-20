//App.js
import React, { Component } from 'react';
import ZappAppBar from './ZappAppBar';
import ZappTabs from './ZappTabs';
import ZappSnackBar from './ZappSnackBar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { data: []};
    }
    render() {
 
        return (
            /* header - where language is switches etc. */

            /* nav / menu  message={this.state.message} open={this.state.open} */

            /* Tab Structure for Content of Route like Management - Topics | Questions | ... */

            /* Footer  */
            <div>
                <ZappAppBar />
                <ZappTabs />
                <ZappSnackBar/>
            </div>
        )
    }
}
export default App;
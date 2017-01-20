import {cyan500} from 'material-ui/styles/colors';

//overall styles.js
const overallStyle = {
    appBarButton: {
        margin: 5
    },
    tabInkBar: {
        background: '#FFFFFF'
    },
    containerDiv: {
        backgroundColor: '#303030'
    },
    ZappSnackBarBodyStyle: {
        /*
        height: 200,
        width: 200,
        color: grey600
        */
        backgroundColor: cyan500,
        textAlign: 'center', 
        flexGrow: 0,
        transition: 'none'
    },
    DialogDeleteTextDiv: {
        marginBottom: '2%'
    },	
    QuestionPaper: {
        textAlign: 'center',
        display: 'inline-block',
        margin: '2%',
        width: '90%',
        backgroundColor: '#FFFFFF'
    },	
    TopicPaper: {
        textAlign: 'center',
        display: 'inline-block',
        margin: '2%',
        width: '90%',
        backgroundColor: '#FFFFFF'
    }
}
module.exports = overallStyle;
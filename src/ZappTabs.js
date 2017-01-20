import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';
import TopicBox from './TopicBox';
import QuestionBox from './QuestionBox';
import overallStyle from './styles/overallStyles';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  paper: {
    textAlign: 'center',
    display: 'inline-block',
    width: '100%'
  }
};

class ZappTabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div>
      <Paper style={styles.paper} zDepth={3}>
        <Paper zDepth={4}>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex} 
          inkBarStyle={overallStyle.tabInkBar}
        >
          <Tab label="Topics" value={0} />
          <Tab label="Questions" value={1} />
        </Tabs>
        </Paper>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
              <TopicBox url='https://zapp-api.herokuapp.com/api/topics' pollInterval={2000}/>
          </div>
          <div>
              <QuestionBox url='https://zapp-api.herokuapp.com/api/questions' urlByTopic='https://zapp-api.herokuapp.com/api/questionsbytopic' urlTopics='https://zapp-api.herokuapp.com/api/topics' pollInterval={2000}/>
          </div>
        </SwipeableViews>
        </Paper>
      </div>
    );
  }
}

export default ZappTabs;
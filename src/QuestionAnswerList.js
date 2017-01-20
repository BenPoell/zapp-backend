//QuestionList.js
import React, { Component } from 'react';
import QuestionAnswer from './QuestionAnswer';
import listStyle from './styles/listStyles';
import formStyle from './styles/formStyles';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DragHandleIcon from 'material-ui/svg-icons/navigation/menu';
import Divider from 'material-ui/Divider';

import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import MenuItem from 'material-ui/MenuItem';
import {red500} from 'material-ui/styles/colors';

import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <DragHandleIcon />); // This can be any component you want

const SortableItem = SortableElement(({value}) => {
    return (
        <li style={listStyle.answerLI}>
            <DragHandle />{value}
        </li>
    )
});

const SortableList = SortableContainer(({items}) => {
	return (
		<ul>
			{items.map((value, index) =>
			<div key={index}>
                <Divider/>              
                <SortableItem key={index} index={index} value={value} />
			</div>
            )}
		</ul>
	);
});


class QuestionAnswerList extends Component {
    constructor(props) {
        super(props);
        //binding all our functions to this class - otherwise you won't have the 'this' selector
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleAnswerDelete = this.handleAnswerDelete.bind(this);
        this.handleAnswerAdd = this.handleAnswerAdd.bind(this);
    }
	
	state = {
        answerNodes: []
    }
	
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            answerNodes: arrayMove(this.state.answerNodes, oldIndex, newIndex),
            answers: arrayMove(this.state.answers, oldIndex, newIndex)
        });
		
		this.props.onAnswersChange(this.state.answers);
    };
	
    handleAnswerChange(index, answer) {		
		/*
		for (var i = 0; i < this.state.answers.length; i++) 
		{
			if (this.state.answers[i]['id'] === id) 
			{	
				//does not work with setState()
				this.state.answers[i]['text'] = answer.answer;
				this.state.answers[i]['solution'] = answer.solution;
			}
		}	
		*/	
		
		this.state.answers[index]['text'] = answer.answer;
		this.state.answers[index]['solution'] = answer.solution;
		
		this.props.onAnswersChange(this.state.answers);
    }
	
    handleAnswerDelete(index, answer) {	
		/*
		var idInt = parseInt(id, 10);
		for (var i = 0; i < this.state.answers.length; i++) 
		{
			var stateIdInt = parseInt(this.state.answers[i]['id'], 10);
			
			if (stateIdInt === idInt) 
			{	
				this.state.answers.splice(i, 1);
				this.state.answerNodes.splice(i, 1);
				break;
			}
		}
		*/
		this.state.answers.splice(index, 1);
		this.state.answerNodes.splice(index, 1);
				
		this.props.onAnswersChange(this.state.answers);
    }	
	
    handleAnswerAdd() {	
		var newId = this.state.answers ? this.state.answers.length + 1 : 1;
		var newAnswer = { id: newId, text: '', solution: false };
		var newAnswerNode = (
					<QuestionAnswer
						onAnswerChange={ this.handleAnswerChange } 
						onAnswerDelete={ this.handleAnswerDelete } 
						onAnswerAdd={ this.handleAnswerAdd } 
						key={newAnswer.id}
						id={newAnswer.id}
						index={newAnswer.id - 1}
						answer={newAnswer.text}
						solution={newAnswer.solution}
						style={{ zIndex: 12000, position: 'absolut' }}
					>
					</QuestionAnswer>
				);
	
		if (!this.state.answers)
		{
			//does not work with setState()
			this.state.answers = [];
		}
		
		if (!this.state.answerNodes)
		{
			//does not work with setState()
			this.state.answerNodes = [];
		}
	
		this.state.answers.push(newAnswer);
		this.state.answerNodes.push(newAnswerNode);
    }
	
	componentWillReceiveProps(props) {		
		if (props.questionId !== this.state.questionId) { 
		
			this.setState({ questionId: props.questionId });
			
			this.setState({ answers: this.props.answers });
			
			//does not work with setState()
			this.state.answerNodes = this.props.answers.map((answers, index) => {				
				// for the letter avatar the first letters of the first two words (if a second word exists)
				return (
					answers != null ?
						<QuestionAnswer
							onAnswerChange={ this.handleAnswerChange } 
							onAnswerDelete={ this.handleAnswerDelete } 
							onAnswerAdd={ this.handleAnswerAdd } 
							key={answers.id}
							id={answers.id}
							index={index}
							answer={answers.text}
							solution={answers.solution}
							style={{ zIndex: 12000, position: 'absolut' }}
						>
						</QuestionAnswer> :
						<QuestionAnswer
							onAnswerChange={ this.handleAnswerChange } 
							onAnswerDelete={ this.handleAnswerDelete } 
							onAnswerAdd={ this.handleAnswerAdd } 
							key={index}
							id={index}
							index={index}
							answer={'FEHLER'}
							solution={false}
							style={{ zIndex: 12000, position: 'absolut' }}
						>
						</QuestionAnswer> 
						
				)
			});
		}
	}
	
    render() {
		
        return (
            <div>
				<SortableList items={this.state.answerNodes} onSortEnd={this.onSortEnd} style={listStyle.answerUL}>
				</SortableList>
				<RaisedButton
					label="Add answer"
					primary={true}
					icon={<AddIcon />}
					style={formStyle.answerAddButton} 
					onTouchTap={this.handleAnswerAdd}
				/>       
            </div>
        )
    }
}
export default QuestionAnswerList;
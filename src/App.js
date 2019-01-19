import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import StudentCard from './components/StudentCard';
import Input from './components/Input';

class App extends Component {
	state = {
		searchValue: ''
	};

	componentDidMount() {
		axios
			.get('https://www.hatchways.io/api/assessment/students')
			.then((res) => {
				this.setState({
					students: res.data.students,
					renderedStudents: res.data.students
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	// RENDERS ALL STUDENT CARDS ON DOM
	renderAllStudents() {
		return this.state.renderedStudents.map((student) => {
			return <StudentCard key={student.id} {...student} />;
		});
	}

	// RENDERS SEARCH FIELD FOR STUDENTS
	renderSearchInput() {
		return (
			<Input
				value={this.state.searchValue}
				placeholder="Search by Name"
				onChange={(e) => {
					this.handleSearchByName(e);
				}}
			/>
		);
	}

	// SEARCH STUDENT NAMES (FIRST AND LAST)
	searchName() {
		let matches = [];
		for (let i = 0; i < this.state.students.length; i++) {
			if (
				(
					this.state.students[i].firstName +
					' ' +
					this.state.students[i].lastName
				)
					.toLowerCase()
					.includes(this.state.searchValue.toLowerCase())
			) {
				matches.push(this.state.students[i]);
			}
		}
		this.setState({
			renderedStudents: matches
		});
	}

	// ON CHANGE FUNCTION FOR SEARCH FIELD
	handleSearchByName(e) {
		this.setState(
			{
				searchValue: e.target.value
			},
			() => {
				this.searchName();
			}
		);
	}

	render() {
		if (!this.state.students) {
			return (
				<div>
					Loading...or unable to retrieve data from API at this point in
					time.
				</div>
			);
		}
		return (
			<div className="AppContainer">
				{this.renderSearchInput()}
				{this.renderAllStudents()}
			</div>
		);
	}
}

export default App;

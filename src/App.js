import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import StudentCard from './components/StudentCard';
import { Input } from './components/Input';

class App extends Component {
	state = {
		searchValue: '',
		tagSearchValue: '',
		tagValue: {}
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
			return (
				<StudentCard
					key={student.id}
					{...student}
					handleTagAdd={(e) => {
						this.handleTagAdd(e, student.id);
					}}
					handleTagChange={(e) => {
						this.handleTagChange(e, student.id);
					}}
					tagInputValue={this.state.tagValue[student.id]}
				/>
			);
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

	// RENDERS TAG SEARCH
	renderTagSearchInput() {
		return (
			<Input
				value={this.state.tagSearchValue}
				placeholder="Search by Tag"
				onChange={(e) => {
					this.handleSearchByTag(e);
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

	// SEARCHES BY TAGS
	searchTag() {
		let matches = [];

		if (this.state.tagSearchValue === '') {
			matches = this.state.students;
		} else {
			for (let i = 0; i < this.state.students.length; i++) {
				if (this.state.students[i].tags !== undefined) {
					for (let j = 0; j < this.state.students[i].tags.length; j++) {
						if (
							this.state.students[i].tags[j].includes(
								this.state.tagSearchValue
							)
						) {
							matches.push(this.state.students[i]);
							break;
						}
					}
				}
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

	// CONTROLLED INPUT FOR TAG SEARCH INPUT
	handleSearchByTag(e) {
		this.setState(
			{
				tagSearchValue: e.target.value
			},
			() => {
				this.searchTag();
			}
		);
	}

	// ADD TAGS
	handleTagAdd(e, studentId) {
		let updatedStudents = this.state.students;

		if (e.key === 'Enter' || e.key === 'Tab') {
			for (let i = 0; i < updatedStudents.length; i++) {
				if (studentId == updatedStudents[i].id) {
					if (updatedStudents[i].tags === undefined) {
						updatedStudents[i].tags = [this.state.tagValue[studentId]];
					} else {
						updatedStudents[i].tags.push(this.state.tagValue[studentId]);
					}
				}
			}

			let tagForStudent = this.state.tagValue;
			tagForStudent[studentId] = '';
			this.setState({
				students: updatedStudents,
				renderedStudents: updatedStudents,
				tagValue: tagForStudent
			});
		}
	}

	// CONTROLLED INPUT FOR TAGS
	handleTagChange(e, studentId) {
		let tagForStudent = this.state.tagValue;
		tagForStudent[studentId] = e.target.value;
		this.setState({
			tagValue: tagForStudent
		});
	}

	render() {
		if (!this.state.students) {
			return (
				<div className="loading-text">
					Beep boop loading...or unable to retrieve data from API at this
					point in time.
				</div>
			);
		}
		return (
			<div className="AppContainer">
				{this.renderSearchInput()}
				{this.renderTagSearchInput()}
				{this.renderAllStudents()}
			</div>
		);
	}
}

export default App;

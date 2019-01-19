import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import StudentCard from './components/StudentCard';

class App extends Component {
	state = {};

	componentDidMount() {
		axios
			.get('https://www.hatchways.io/api/assessment/students')
			.then((res) => {
				this.setState({
					students: res.data.students
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	renderAllStudents() {
		console.log(this.state);
		return this.state.students.map((student) => {
			return <StudentCard key={student.id} {...student} />;
		});
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
		return <div className="AppContainer">{this.renderAllStudents()}</div>;
	}
}

export default App;

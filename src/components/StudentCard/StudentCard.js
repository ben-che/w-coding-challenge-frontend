import React, { Component } from 'react';
import './StudentCard.css';

class StudentCard extends Component {
	state = { toggled: false };

	// CALCULATES AVERAGE OF ALL GRADES
	calculateAverage(gradeArr) {
		return (
			gradeArr.reduce((a, b) => {
				return Number(a) + Number(b);
			}) / gradeArr.length
		).toFixed(2);
	}

	// RENDERS TOGGLE BUTTON DEPENDING ON STATE
	renderToggle() {
		if (this.state.toggled) {
			return '--';
		}
		return '+';
	}

	handleToggle() {
		this.setState({
			toggled: !this.state.toggled
		});
	}

	render() {
		return (
			<div className="student-card">
				<div className="student-picture-container">
					<div
						className="student-picture"
						style={{ backgroundImage: `url(${this.props.pic})` }}
					/>
					<div className="student-description-container">
						<p className="student-description-title">
							{this.props.firstName} {this.props.lastName}
						</p>
						<p className="student-description-content">
							Email: {this.props.email}
						</p>
						<p className="student-description-content">
							Company: {this.props.company}
						</p>
						<p className="student-description-content">
							Skill: {this.props.skill}
						</p>
						<p className="student-description-content">
							Average: {this.calculateAverage(this.props.grades)}
						</p>
					</div>
				</div>
				<div className="student-toggle" onClick={() => this.handleToggle()}>
					{this.renderToggle()}
				</div>
			</div>
		);
	}
}

export default StudentCard;

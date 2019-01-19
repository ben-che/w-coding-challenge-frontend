import React from 'react';
import './StudentCard.css';

export default function StudentCard(props) {
	return (
		<div className="student-card">
			<div className="student-picture-container">
				<div
					className="student-picture"
					style={{ backgroundImage: `url(${props.pic})` }}
				/>
				<div className="student-description-container">
					<p className="student-description-title">
						{props.firstName} {props.lastName}
					</p>
					<p className="student-description-content">
						Email: {props.email}
					</p>
					<p className="student-description-content">
						Company: {props.company}
					</p>
					<p className="student-description-content">
						Skill: {props.skill}
					</p>
					<p className="student-description-content">
						Average: {calculateAverage(props.grades)}
					</p>
				</div>
			</div>
		</div>
	);
}

function calculateAverage(gradeArr) {
	return (
		gradeArr.reduce((a, b) => {
			return Number(a) + Number(b);
		}) / gradeArr.length
	).toFixed(2);
}

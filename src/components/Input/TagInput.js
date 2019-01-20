import React from 'react';
import './Input.css';

export default function TagInput(props) {
	return (
		<input
			className="input-field"
			placeholder={props.placeholder}
			value={`${props.value === undefined ? '' : props.value}`}
			onChange={(e) => {
				props.handleChange(e);
			}}
			onBlur={(e) => {
				props.handleBlur(e);
			}}
		/>
	);
}

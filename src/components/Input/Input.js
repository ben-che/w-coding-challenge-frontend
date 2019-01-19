import React from 'react';
import './Input.css';

export default function Input(props) {
	return (
		<input
			className="input-field"
			placeholder={props.placeholder}
			onChange={(e) => {
				props.onChange(e);
			}}
			value={props.value}
		/>
	);
}

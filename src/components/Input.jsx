import React from "react";
import Rule from "./Rule";

function Input({ value, onChange }) {
	return (
		<div className="form">
			<label htmlFor={value}></label>
			<input
				placeholder="Inserisci il password"
				type="text"
				onChange={onChange}
				value={value}
				className="input border-stone-400 p-2 mt-2 mb-2 mr-1 border-2 rounded-md focus:outline-none focus:border-stone-600 bg-white w-3/6"
			/>
		</div>
	);
}

export default Input;

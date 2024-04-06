import React from "react";
import Rule from "./Rule";

function Input({ value, onChange}) {

	return (
		<div className="form">
			<label htmlFor={value}>Inserisci il password</label>
			<input
				type="text"
				onChange={onChange}
				value={value}
				className="border border-stone-600 p-2 rounded-md focus:outline-none focus:border-stone-950 bg-orange-100 w-3/6"
			/>
		</div>
	);
}

export default Input;

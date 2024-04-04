import React from "react";
import Rule from "./Rule";

function Input({ name, data, onChange, error, isComplited }) {

	return (
		<div className="form">
			<label htmlFor={name}>Inserisci il password</label>
			<input
				type="text"
				onChange={onChange}
				name={name}
				value={data}
				className="border border-stone-600 p-2 rounded-md focus:outline-none focus:border-stone-950 bg-orange-100 w-3/6"
			/>
			{error && (
				<Rule
					id={1}
					description={error}
					isCompleted={isComplited[name]}
				/>
			)}
		</div>
	);
}

export default Input;

import { useState } from "react";

import Input from "./components/Input";
import Joi from "joi-browser";
import useValidate from "./components/hooks/useValidate";
import "./App.css";

function App() {
	const schema = {
		password: Joi.string().min(6).max(9).required().label("Password"),
	};
	const doSubmit = () => {
		//call server
		console.log("Submitted");
	};
	const { data, errors, handleChange, handleSubmit, validate, ruleStatus } =
		useValidate(schema);

	return (
		<>
			<h1 className="text-3xl font-bold mb-4 stroke-stone-950">
				Gioco della Password
			</h1>

			<form onSubmit={(e) => handleSubmit(e, doSubmit)}>
			<button
    disabled={validate()}
    type="submit"
    className={`p-2 mb-2 rounded-md border-2 ${validate() ? 'bg-red-200 text-red-300 cursor-not-allowed' : 'bg-red-400 text-white border-red-400 hover:bg-red-500 focus:outline-none'}`}
>
    Submit
</button>

				<Input
					name={"password"}
					data={data.password}
					onChange={handleChange}
					error={errors.password}
					isComplited={ruleStatus}
				/>
			</form>
		</>
	);
}

export default App;

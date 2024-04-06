import { useState, useEffect } from "react";
import Input from "./components/Input";
import Rule from "./components/Rule";
import "./App.css";

function App() {
	const [gameLevel, setGameLevel] = useState(0);
	const [value, setValue] = useState("");

	useEffect(() => {
		console.log("gameLevel", gameLevel);
	}, [gameLevel]);

	const rule1 = () => {
		const result = value.length >= 4 ? true : false;
		if (result && gameLevel === 1) setGameLevel(2);
		return result;
	};
	const rule2 = () => {
		const result = value.length >= 5 ? true : false;
		if (result && gameLevel === 2) setGameLevel(3);
		return result;
	};
	const rule3 = () => {
		const result = value.length >= 9 ? true : false;
		if (result && gameLevel === 3) setGameLevel(4);
		return result;
	};
	const rule4 = () => {
		const result = value.length > 11 ? true : false;
		if (result && gameLevel === 4) setGameLevel(5);
		return result;
	};

	const rules = [
		{ id: 1, description: "must be > 4", completed: rule1 },
		{ id: 2, description: "must be > 5", completed: rule2 },
		{ id: 3, description: "must be > 9", completed: rule3 },
		{ id: 4, description: "must be < 11", completed: rule4 },
	];

	const handleChange = (e) => {
		const newValue = e.target.value;
		setValue(newValue);
		if (gameLevel === 0) {
			setGameLevel(1);
		}
	};

	const doSubmit = () => {
		//call server
		console.log("Submitted");
	};

	return (
		<>
			<h1 className="text-3xl font-bold mb-4 stroke-stone-950">
				Gioco della Password
			</h1>

			<form onSubmit={doSubmit}>
				<button
					disabled
					type="submit"
					// className={`p-2 mb-2 rounded-md border-2 ${
					// 	validate()
					// 		? "bg-red-200 text-red-300 cursor-not-allowed"
					// 		: "bg-red-400 text-white border-red-400 hover:bg-red-500 focus:outline-none"
					// }`}
				>
					Submit
				</button>
				<Input
					name={"password"}
					value={value}
					onChange={(e) => handleChange(e)}
				/>
				{rules.slice(0, gameLevel).map((rule) => {
		
						return (
							<Rule
								key={rule.id}
								id={rule.id}
								isCompleted={rule.completed()}
								description={rule.description}
							/>
						);
					
				})}
			</form>
		</>
	);
}

export default App;

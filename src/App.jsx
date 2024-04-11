import { useState, useEffect } from "react";
import Input from "./components/Input";
import Rules from "./components/Rules";
import "./App.css";

function App() {
	const [gameLevel, setGameLevel] = useState(0);
	const [value, setValue] = useState("");
	const [message, setMessage] = useState("");

	// useEffect(() => {
	// 	console.log("gameLevel", gameLevel);
	// }, [gameLevel]);

	const handleChange = (e) => {
		const newValue = e.target.value;
		setValue(newValue);
		setMessage("");
		if (gameLevel === 0) {
			setGameLevel(1);
		}
	};

	const doSubmit = () => {
		//call server
		setValue("");
		setGameLevel(0);
		setMessage(
			"Questa password è già in uso, purtroppo. Si prega di riprovare."
		);
		console.log("Submitted");
	};

	return (
		<>
			<h1 className="text-3xl font-bold mb-16 text-stone-700">
				Gioco della Password
			</h1>

			<form onSubmit={(e) => e.preventDefault(doSubmit())}>
				<div className="form">
					<Input
						name={"password"}
						value={value}
						onChange={(e) => handleChange(e)}
					/>
					<button
						disabled={gameLevel !== 11}
						type="submit"
						className={`p-2 rounded-md border-2 font-semibold ${
							gameLevel !== 11
								? "bg-red-200 text-white border-white cursor-not-allowed"
								: "bg-red-400 text-white border-red-400 hover:bg-red-500 focus:outline-none"
						}`}
					>
						Submit
					</button>
				</div>
				{message && <p>{message}</p>}
				<Rules
					value={value}
					gameLevel={gameLevel}
					handleLevel={setGameLevel}
				/>
			</form>
		</>
	);
}

export default App;

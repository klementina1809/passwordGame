import { useState } from "react";
import Rule from "./components/Rule";
import classNames from 'classnames';
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1 className="text-3xl font-bold mb-4 stroke-stone-950">
				Gioco della Password
			</h1>
			<div className="form">
				<label htmlFor="">Inserisci il password</label>
				<input
					type="text"
					className="border border-stone-600 p-2 rounded-md focus:outline-none focus:border-stone-950 bg-orange-100 w-3/6"
				/>
			</div>
			<Rule
				id={1}
				isCompleted={true}
				description="fvd dvgsf sdg sefsdg sfsgsght ss"
			/>
		</>
	);
}

export default App;

import React, { useState } from "react";
import Rule from "./Rule";

function Rules({ value, gameLevel, handleLevel }) {
	const [country, setCountry] = useState("");
	const countries = [
		{ country: "Italia", capital: "Roma" },
		{ country: "Francia", capital: "Parigi" },
		{ country: "Spagna", capital: "Madrid" },
		{ country: "Germania", capital: "Berlino" },
		{ country: "Portogallo", capital: "Lisbona" },
		{ country: "Repubblica Ceca", capital: "Praga" },
		{ country: "Ucraina", capital: "Kiev" },
		{ country: "Svizzera", capital: "Berna" },
		{ country: "Austria", capital: "Vienna" },
		{ country: "Svezia", capital: "Stoccolma" },
	];

	const generateCountry = () => {
		const index = Math.floor(Math.random() * 10);
		setCountry(countries[index].country);
	};

	const rule1 = () => {
		const result = value.length >= 6 ? true : false;
		if (result && gameLevel === 1) handleLevel(2);
		return result;
	};
	const rule2 = () => {
		let result = false;
		let count = 0;
		for (let i = 0; i < value.length; i++) {
			if (!isNaN(+value[i])) {
				count++;
			}
		}
		if (count >= 2) {
			result = true;
		}

		if (result && gameLevel === 2) {
			handleLevel(3);
		}
		return result;
	};
	const rule3 = () => {
		const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
		const result = specialCharacters.test(value);
		if (result && gameLevel === 3) handleLevel(4);
		return result;
	};

	const rule4 = () => {
		const uppercaseLetter = /[A-Z]/;
		const result = uppercaseLetter.test(value);
		if (result && gameLevel === 4) handleLevel(5);
		return result;
	};
	const rule5 = () => {
		let result = false;
		let count = 0;
		for (let i = 0; i < value.length; i++) {
			if (!isNaN(+value[i])) {
				count += +value[i];
			}
		}
		if (count >= 24) {
			result = true;
		}
		if (result && gameLevel === 5) handleLevel(6);

		return result;
	};
	const rule6 = () => {
		if (!country) {
			generateCountry();
		}

		let city = "";
		for (let i of countries) {
			if (i.country === country) {
				city = i.capital;
				break;
			}
		}

		const result = value.includes(city);
		if (result && gameLevel === 6) handleLevel(7);
		return result;
	};

	const rules = [
		{
			id: 1,
			description: "La password deve essere più lunga di 6 caratteri",
			completed: rule1,
		},
		{
			id: 2,
			description: "La password deve includere almeno 2 numeri",
			completed: rule2,
		},
		{
			id: 3,
			description:
				"La password deve contenere almeno un carattere speciale",
			completed: rule3,
		},
		{
			id: 4,
			description:
				"La password deve includere almeno una lettera maiuscola",
			completed: rule4,
		},
		{
			id: 5,
			description:
				"La somma di tutti i numeri deve essere maggiore di 24",
			completed: rule5,
		},
		{
			id: 6,
			description: `La password deve includere la capitale di ${country} `,
			completed: rule6,
		},
	];

	return (
		<>
			{rules
				.slice(0, gameLevel)
				.reverse()
				.map((rule) => {
					return (
						<Rule
							key={rule.id}
							id={rule.id}
							isCompleted={rule.completed()}
							description={rule.description}
						/>
					);
				})}
		</>
	);
}

export default Rules;

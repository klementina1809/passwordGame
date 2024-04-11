import React, { useState, useEffect } from "react";
import Rule from "./Rule";

function Rules({ value, gameLevel, handleLevel }) {
	const [country, setCountry] = useState("Italia");
	const countries = [
		{ country: "Italia", capital: "Roma" },
		{ country: "Francia", capital: "Parigi" },
		{ country: "Spagna", capital: "Madrid" },
		{ country: "Germania", capital: "Berlino" },
		{ country: "Portogallo", capital: "Lisbona" },
		{ country: "Repubblica Ceca", capital: "Praga" },
		{ country: "Ucraina", capital: "Kiev" },
		{ country: "Canada", capital: "Ottawa" },
		{ country: "Austria", capital: "Vienna" },
		{ country: "Regno Unito", capital: "Londra" },
	];

	useEffect(() => {
		generateCountry();
	}, []);

	const italianMonths = [
		"gennaio",
		"febbraio",
		"marzo",
		"aprile",
		"maggio",
		"giugno",
		"luglio",
		"agosto",
		"settembre",
		"ottobre",
		"novembre",
		"dicembre",
	];

	const generateCountry = () => {
		const index = Math.floor(Math.random() * 10);
		setCountry(countries[index].country);
	};

	const getDate = () => {
		let date = new Date();
		return date;
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
		if (count === 24) {
			result = true;
		}
		if (result && gameLevel === 5) handleLevel(6);
		return result;
	};

	const rule6 = () => {
		let city = "";
		if (country) {
			for (let i of countries) {
				if (i.country === country) {
					city = i.capital;
					break;
				}
			}
		}
		const result = value.toLowerCase().includes(city.toLowerCase());
		if (result && gameLevel === 6) handleLevel(7);
		return result;
	};

	const rule7 = () => {
		const result = italianMonths.some((m) =>
			value.toLowerCase().includes(m)
		);
		if (result && gameLevel === 7) {
			handleLevel(8);
		}
		return result;
	};

	const rule8 = () => {
		let count = 0;
		for (let char of value) {
			if (char.toLowerCase() === "o") {
				count++;
				console.log(count);
			}
		}
		if (count < 2 && gameLevel === 8) {
			handleLevel(9);
		}
		return count < 2;
	};

	const rule9 = () => {
		const date = getDate();
		const hours = date.getHours().toString();
		console.log(hours);
		const result = value.includes(hours);
		if (result && gameLevel === 9) handleLevel(10);
		return result;
	};

	const rule10 = () => {
		let result = false;
		if (value.length <= 1) {
			return false;
		}
		for (let i = 2; i <= Math.sqrt(value.length); i++) {
			if (value.length % i === 0) {
				return false;
			}
		}
		result = true;
		if (result && gameLevel === 10) handleLevel(11);
		return true;
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
			description: "La somma di tutti i numeri deve essere uguale a 24",
			completed: rule5,
		},
		{
			id: 6,
			description: `La password deve includere la capitale di ${country} `,
			completed: rule6,
		},
		{
			id: 7,
			description: "La password deve includere il nome di un mese",
			completed: rule7,
		},
		{
			id: 8,
			description: "La password non può contenere più di una lettera 'o'",
			completed: rule8,
		},
		{
			id: 9,
			description:
				"La password deve contenere il numero dell'ora corrente",
			completed: rule9,
		},
		{
			id: 10,
			description:
				"La lunghezza della password deve essere uguale a un numero primo",
			completed: rule10,
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

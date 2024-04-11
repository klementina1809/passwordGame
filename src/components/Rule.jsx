import React from "react";
import classNames from "classnames";

function Rule({ id, isCompleted, description }) {
	const ruleClasses = classNames({
		"max-w-xl mx-auto rounded-md overflow-hidden border-2 border-red-400 mt-4 w-3/6 rule shadow-lg":
			!isCompleted,
		"max-w-xl mx-auto rounded-md overflow-hidden border-2 border-green-400 mt-4 w-3/6 rule shadow-lg":
			isCompleted,
	});

	return (
		<div className={ruleClasses}>
			<div className={isCompleted ? "bg-green-200 font-semibold" : "bg-red-200 font-semibold"}>
				Rule {id}
			</div>
			<div
				className={
					isCompleted ? "bg-green-100 py-3" : "bg-red-100 py-3"
				}
			>
				{description}
			</div>
		</div>
	);
}

export default Rule;

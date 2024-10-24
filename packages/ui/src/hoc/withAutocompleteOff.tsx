import React from "react";

export const withAutocompleteOff = <T extends object>(
	Component: React.FC<T>
) => {
	return function WithAutocompleteOff(props: T) {
		return (
			<form autoComplete="off">
				<input
					autoComplete="false"
					className="hidden"
					name="hidden"
					style={{ display: "none" }}
					type="text"
				></input>
				<Component {...props} />
			</form>
		);
	};
};

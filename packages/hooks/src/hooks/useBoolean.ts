"use client";

import { useState } from "react";

export const useBoolean = (initialValue = false) => {
	const [value, setValue] = useState(initialValue);

	const setToFalse = () => setValue(false);

	const setToTrue = () => setValue(true);

	const toggle = () => setValue(!value);

	const update = (l: boolean) => setValue(l);

	return {
		setToFalse,
		setToTrue,
		toggle,
		update,
		value,
	};
};

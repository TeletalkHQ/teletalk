import { useBoolean } from "./useBoolean";

export const useLoading = (initialValue = false) => {
	const { setToFalse, setToTrue, toggle, update, value } =
		useBoolean(initialValue);

	return {
		finishLoading: setToFalse,
		isLoading: value,
		startLoading: setToTrue,
		toggleLoading: toggle,
		updateLoading: update,
	};
};

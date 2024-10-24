import { useState } from "react";

export const useForceUpdate = () => {
	const [forceUpdate, setForceUpdate] = useState(false);

	const update = () => setForceUpdate(!forceUpdate);

	return {
		forceUpdate: update,
	};
};

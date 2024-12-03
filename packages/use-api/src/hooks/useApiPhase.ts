import { HTTPRouteName } from "@repo/schema";

import { defaultPhase, useApiPhaseStore } from "../store";

export const useApiPhase = (name: HTTPRouteName) => {
	const apiPhaseStore = useApiPhaseStore();

	function startLoading() {
		apiPhaseStore.startLoading(name);
	}
	function finishLoading() {
		apiPhaseStore.finishLoading(name);
	}
	function startUpdating() {
		apiPhaseStore.startUpdating(name);
	}
	function finishUpdating() {
		apiPhaseStore.finishUpdating(name);
	}

	return {
		...defaultPhase,
		...apiPhaseStore.phases[name],
		finishLoading,
		finishUpdating,
		startLoading,
		startUpdating,
	};
};

import { HTTPRouteName } from "@repo/schema";
import { defaultLoadingItem, useLoadingStore } from "@repo/store";

export const useApiPhase = (name: HTTPRouteName) => {
	const loadingStore = useLoadingStore();

	function startLoading() {
		loadingStore.startLoading(name);
	}
	function finishLoading() {
		loadingStore.finishLoading(name);
	}
	function startUpdating() {
		loadingStore.startUpdating(name);
	}
	function finishUpdating() {
		loadingStore.finishUpdating(name);
	}

	return {
		...defaultLoadingItem,
		...loadingStore.phases[name],
		finishLoading,
		finishUpdating,
		startLoading,
		startUpdating,
	};
};

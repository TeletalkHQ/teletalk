import { useLoadingStore } from "@repo/store";
import MoonLoader from "react-spinners/MoonLoader";

import { Flex } from "../../base";

// UNUSED
export const FullPageLoading = () => {
	const loadingStore = useLoadingStore();

	return (
		loadingStore.globalLoading.open &&
		loadingStore.globalLoading.type === "FULL_PAGE" && (
			<Flex
				ai="center"
				fullHeight
				fullWidth
				jc="center"
				sx={(theme) => ({
					zIndex: theme.zIndex.tooltip + 1000,
					top: 0,
					left: 0,
					position: "absolute",
					backgroundColor: theme.palette.background.default,
				})}
			>
				<MoonLoader
					color={loadingStore.globalLoading.color}
					loading
					size={loadingStore.globalLoading.size}
					speedMultiplier={loadingStore.globalLoading.speedMultiplier}
				/>
			</Flex>
		)
	);
};

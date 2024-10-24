import { useLoadingStore } from "@repo/store";
import MoonLoader from "react-spinners/MoonLoader";

import { Box } from "../../base";

// UNUSED
export const FullPageLoading = () => {
	const loadingStore = useLoadingStore();

	return (
		loadingStore.globalLoading.open &&
		loadingStore.globalLoading.type === "FULL_PAGE" && (
			<Box.Flex
				fullHeight
				fullWidth
				ai="center"
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
					loading
					color={loadingStore.globalLoading.color}
					size={loadingStore.globalLoading.size}
					speedMultiplier={loadingStore.globalLoading.speedMultiplier}
				/>
			</Box.Flex>
		)
	);
};

import MoonLoader from "react-spinners/MoonLoader";

import { useGlobalStore } from "~/store";

import { Box } from "..";

const FullPageLoading = () => {
  const globalStore = useGlobalStore();

  return (
    <>
      {globalStore.loading.open && globalStore.loading.type === "FULL_PAGE" && (
        <Box.Flex
          ai={"center"}
          jc={"center"}
          sx={(theme) => ({
            zIndex: theme.zIndex.tooltip + 1000,
            top: "0",
            left: "0",
            position: "absolute",
            backgroundColor: theme.palette.background.default,
            width: "100%",
            height: "100%",
          })}
        >
          <MoonLoader
            color={globalStore.loading.color}
            loading
            size={globalStore.loading.size}
            speedMultiplier={globalStore.loading.speedMultiplier}
          />
        </Box.Flex>
      )}
    </>
  );
};

export default FullPageLoading;

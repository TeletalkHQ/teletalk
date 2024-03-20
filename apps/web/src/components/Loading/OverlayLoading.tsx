import { useGlobalStore } from "~/store";

import { Progress } from "..";
import Backdrop from "./Backdrop";

const OverlayLoading = () => {
  const globalStore = useGlobalStore();

  return (
    <>
      <Backdrop
        open={
          globalStore.loading.open && globalStore.loading.type === "OVERLAY"
        }
        sx={{
          color: globalStore.loading.color,
          // zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        onClick={globalStore.closeOverlayLoading}
      >
        <Progress.Circular color={globalStore.loading.progressColor} />
      </Backdrop>
    </>
  );
};

export default OverlayLoading;

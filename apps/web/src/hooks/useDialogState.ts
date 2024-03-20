import { useGlobalStore } from "~/store";
import { DialogName, DialogProps } from "~/types";

export const useDialogState = (
  dialogName: DialogName
): {
  open: boolean;
  props: DialogProps;
} => {
  const globalStore = useGlobalStore();

  const ds = globalStore.dialogStates.at(-1);

  return ds?.name === dialogName
    ? {
        ...ds,
        open: true,
      }
    : {
        open: false,
        props: {
          zIndex: 1300,
        },
      };
};

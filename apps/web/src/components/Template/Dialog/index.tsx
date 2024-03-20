import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { appConfigs } from "~/classes/AppConfigs";
import { BaseComponent } from "~/components/Base";
import { useGlobalStore } from "~/store";
import { Style, TransitionName, VoidNoArgsFn } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

interface Props {
  actions: JSX.Element;
  isClosable?: boolean;
  content: JSX.Element;
  dialogStyle?: Style;
  onClose?: VoidNoArgsFn;
  onKeyDown?: VoidNoArgsFn;
  open: boolean;
  paperStyle?: Style;
  title?: string | JSX.Element;
  transitionDuration?: number;
  transitionName?: TransitionName;
  onAfterClose?: VoidNoArgsFn;
}

const Dialog: React.FC<Props> = ({
  actions,
  content,
  dialogStyle,
  onClose,
  onAfterClose,
  onKeyDown,
  open,
  paperStyle,
  title,
  transitionDuration,
  isClosable = true,
  transitionName = appConfigs.getConfigs().ui.dialogDefaultTransition,
}) => {
  const globalStore = useGlobalStore();

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const Transition =
    BaseComponent.Transition[transitionName] ||
    BaseComponent.Transition[
      appConfigs.getConfigs().ui.dialogDefaultTransition
    ];

  const handleClose = () => {
    const oc = onClose || globalStore.closeAllDialog;
    oc();
    onAfterClose?.();
  };

  return (
    <BaseComponent.Box.Dialog
      fullScreen={fullScreen}
      keepMounted
      {...{
        onClose: isClosable ? handleClose : undefined,
      }}
      // onEscapeKeyDown={onEscapeKeyDown}
      open={open}
      PaperProps={{
        style: {
          borderRadius: fullScreen ? "" : "15px",
          minWidth: fullScreen ? "auto" : "450px",
          ...paperStyle,
          height: fullScreen ? "100vh" : paperStyle?.height,
        },
      }}
      sx={{ ...dialogStyle }}
      TransitionComponent={Transition}
      transitionDuration={transitionDuration || 500}
      onKeyDown={onKeyDown}
    >
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Actions>{actions}</Actions>
    </BaseComponent.Box.Dialog>
  );
};

export default Dialog;

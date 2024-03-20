import { BaseComponent } from "./Base";
import { Transition as TransitionComponents } from "./Base/Transition";
import { CommonComponent } from "./Common";
import { Loading as LoadingComponents } from "./Loading";
import { Other } from "./Other";
import { Template as TemplateComponents } from "./Template";

export const Box = {
  ...BaseComponent.Box,
};

export const Button = {
  Base: BaseComponent.Input.Button,
  ...CommonComponent.Input.Button,
  Icon: BaseComponent.Input.IconButton,
  Loading: BaseComponent.Input.LoadingButton,
};

export const Input = {
  ...CommonComponent.Input,
  Base: {
    ...BaseComponent.Input,
  },
};

export const Icon = {
  ...BaseComponent.Icon,
};

export const Loading = {
  ...LoadingComponents,
};

export const Template = {
  ...TemplateComponents,
};

export const Transition = {
  ...TransitionComponents,
};

export const Typography = {
  ...BaseComponent.Typography,
  Base: BaseComponent.Typography.Base,
};

export const Progress = {
  ...BaseComponent.Progress,
};

export const Components = {
  Base: {
    ...BaseComponent.Portal,
  },
  ...Other,
};

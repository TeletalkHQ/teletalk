import { type CheckboxProps, Checkbox as MuiCheckbox } from "@mui/material";

interface Props extends CheckboxProps {}

export const Checkbox: React.FC<Props> = (props) => {
	return <MuiCheckbox {...props} />;
};

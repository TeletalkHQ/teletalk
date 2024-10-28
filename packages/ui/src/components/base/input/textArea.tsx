import { FieldInputBaseProps, TextField } from "./field";

interface Props extends Omit<FieldInputBaseProps, "multiline"> {}

export const TextArea: React.FC<Props> = ({
	minRows = 4,
	maxRows = 8,
	...rest
}) => {
	return <TextField maxRows={maxRows} minRows={minRows} multiline {...rest} />;
};

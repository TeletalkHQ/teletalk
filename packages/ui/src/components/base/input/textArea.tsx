import { Field, FieldInputBaseProps } from "./field";

interface Props extends Omit<FieldInputBaseProps, "multiline"> {}

export const TextArea: React.FC<Props> = ({
	minRows = 4,
	maxRows = 8,
	...rest
}) => {
	return <Field maxRows={maxRows} minRows={minRows} multiline {...rest} />;
};

export interface FormProps extends React.ComponentProps<"form"> {}

export const Form: React.FC<FormProps> = (props) => {
	return <form {...props} />;
};

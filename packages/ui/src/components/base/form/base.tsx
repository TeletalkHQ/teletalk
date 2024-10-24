export interface FormProps extends React.ComponentProps<"form"> {}

export const Base: React.FC<FormProps> = (props) => {
	return <form {...props} />;
};

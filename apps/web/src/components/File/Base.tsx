type Props = Omit<
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>,
	"type"
>;

export const Base: React.FC<Props> = (props) => {
	return <input {...props} type="file" />;
};

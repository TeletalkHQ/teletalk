import { LoadingButton, LoadingButtonProps } from "../../base";

interface Props {
	leftProps: LoadingButtonProps;
	middleProps: LoadingButtonProps;
	rightProps: LoadingButtonProps;
}

export const TripleAction: React.FC<Props> = ({
	leftProps,
	middleProps,
	rightProps,
}) => {
	return (
		<>
			<LoadingButton variant="text" {...leftProps} />

			<LoadingButton variant="text" {...middleProps} />

			<LoadingButton {...rightProps} />
		</>
	);
};

import type { LoadingButtonProps } from "../../button/loading";
import { LoadingButton } from "../../button/loading";

interface Props {
	leftButtonProps: LoadingButtonProps;
	middleButtonProps: LoadingButtonProps;
	rightButtonProps: LoadingButtonProps;
}

export const TripleAction: React.FC<Props> = ({
	leftButtonProps: leftProps,
	middleButtonProps: middleProps,
	rightButtonProps: rightProps,
}) => {
	return (
		<>
			<LoadingButton variant="text" {...leftProps} />

			<LoadingButton variant="text" {...middleProps} />

			<LoadingButton {...rightProps} />
		</>
	);
};

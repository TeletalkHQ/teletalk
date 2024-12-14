import type { LoadingButtonProps } from "../../button/loading";
import { LoadingButton } from "../../button/loading";

interface Props {
	leftButtonProps: LoadingButtonProps;
	leftButtonText?: string;
	rightButtonProps: LoadingButtonProps;
	rightButtonText?: string;
}

export const DoubleAction: React.FC<Props> = ({
	leftButtonProps: cancelProps,
	leftButtonText: cancelText = "Cancel",
	rightButtonProps: confirmProps,
	rightButtonText: confirmText = "Confirm",
}) => {
	return (
		<>
			<LoadingButton color="error" variant="text" {...cancelProps}>
				{cancelText}
			</LoadingButton>

			<LoadingButton {...confirmProps}> {confirmText}</LoadingButton>
		</>
	);
};

import type { LoadingButtonProps } from "../../button/loading";
import { LoadingButton } from "../../button/loading";

interface Props {
	cancelProps: LoadingButtonProps;
	cancelText?: string;
	confirmProps: LoadingButtonProps;
	confirmText?: string;
}

export const DoubleAction: React.FC<Props> = ({
	cancelProps,
	confirmProps,
	confirmText = "Confirm",
	cancelText = "Cancel",
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

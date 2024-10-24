import { LoadingButton, LoadingButtonProps } from "../../base";

interface Props {
	cancelProps: LoadingButtonProps;
	cancelText?: string;
	confirmProps: LoadingButtonProps;
	confirmText?: string;
}

export const ConfirmActions: React.FC<Props> = ({
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

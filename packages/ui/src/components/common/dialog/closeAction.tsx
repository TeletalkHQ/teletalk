import { LoadingButton, LoadingButtonProps } from "../../base";

interface Props {
	closeProps: LoadingButtonProps;
}

export const CloseAction: React.FC<Props> = ({ closeProps }) => {
	return (
		<>
			<LoadingButton variant="outlined" {...closeProps}>
				Close
			</LoadingButton>
		</>
	);
};

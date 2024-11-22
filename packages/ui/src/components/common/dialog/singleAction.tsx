import { LoadingButton, LoadingButtonProps } from "../../base";

interface Props {
	closeProps: LoadingButtonProps;
}

export const SingleAction: React.FC<Props> = ({ closeProps }) => {
	return (
		<>
			<LoadingButton variant="outlined" {...closeProps}>
				Close
			</LoadingButton>
		</>
	);
};

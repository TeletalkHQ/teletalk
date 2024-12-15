import type { LoadingButtonProps } from "../../button/loading";
import { LoadingButton } from "../../button/loading";

interface Props {
	buttonProps: LoadingButtonProps;
	text?: string;
}

export const SingleAction: React.FC<Props> = ({
	buttonProps: closeProps,
	text = "Close",
}) => {
	return (
		<LoadingButton variant="text" {...closeProps}>
			{text}
		</LoadingButton>
	);
};

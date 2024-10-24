import { LoadingType, ProgressColor, VoidNoArgs } from "@repo/types";

import { Progress } from "../../base";
import { Backdrop } from "./backdrop";

interface Props {
	color: string;
	isOpen: boolean;
	onClose: VoidNoArgs;
	progressColor: ProgressColor;
	type: LoadingType;
}

export const OverlayLoading: React.FC<Props> = ({
	color,
	isOpen,
	onClose,
	progressColor,
	type,
}) => {
	return (
		<Backdrop
			open={isOpen && type === "OVERLAY"}
			sx={{
				color,
				// zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			onClick={onClose}
		>
			<Progress.Circular color={progressColor} />
		</Backdrop>
	);
};

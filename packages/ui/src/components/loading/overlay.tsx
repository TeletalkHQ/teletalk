import { type VoidNoArgs } from "@repo/types";

import { type ProgressColor } from "../../types";

interface Props {
	color: string;
	isOpen: boolean;
	onClose: VoidNoArgs;
	progressColor: ProgressColor;
}

export const OverlayLoading: React.FC<Props> = () => {
	// return (
	// 	<Backdrop
	// 		open={isOpen && type === "OVERLAY"}
	// 		sx={{
	// 			color,
	// 			// zIndex: (theme) => theme.zIndex.drawer + 1,
	// 		}}
	// 		onClick={onClose}
	// 	>
	// 		<Progress.Circular color={progressColor} />
	// 	</Backdrop>
	// );

	return null;
};

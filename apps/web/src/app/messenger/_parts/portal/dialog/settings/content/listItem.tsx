import { type VoidNoArgs } from "@repo/types";
import { Div } from "@repo/ui/box/div";
import { ListItemButton } from "@repo/ui/box/listItemButton";
import {
	DynamicIcon,
	type IconComponentType,
} from "@repo/ui/icons/dynamicIcon";

interface Props {
	onClick: VoidNoArgs;
	displayName: string;
	disabled: boolean;
	Icon: IconComponentType;
}

export const ListItem: React.FC<Props> = ({
	disabled,
	displayName,
	Icon,
	onClick,
}) => (
	<ListItemButton
		disabled={disabled}
		style={{
			display: "flex",
			height: "65px",
			borderRadius: "10px",
			gap: 10,
			alignItems: "center",
		}}
		onClick={onClick}
	>
		<DynamicIcon icon={Icon} />
		<Div> {displayName}</Div>
	</ListItemButton>
);

import { VoidNoArgs } from "@repo/types";
import { Box } from "@repo/ui";

import { IconType } from "~/types";

import { SettingDisplayName } from "../types";

interface Props {
	onClick: VoidNoArgs;
	displayName: SettingDisplayName;
	disabled: boolean;
	Icon: IconType;
}

const ListItem: React.FC<Props> = ({
	disabled,
	displayName,
	Icon,
	onClick,
}) => (
	<Box.ListItemButton
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
		<Icon style={{ fontSize: 30 }} />
		<Box.Div> {displayName}</Box.Div>
	</Box.ListItemButton>
);

export default ListItem;

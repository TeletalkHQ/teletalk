import { VoidNoArgs } from "@repo/types";
import { Div } from "@repo/ui/box/div";
import { ListItemButton } from "@repo/ui/box/listItemButton";
import { GeneratedIcon } from "@repo/ui/icons/utils";

import { SettingDisplayName } from "../types";

interface Props {
	onClick: VoidNoArgs;
	displayName: SettingDisplayName;
	disabled: boolean;
	Icon: GeneratedIcon;
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
		<Icon style={{ fontSize: 30 }} />
		<Div> {displayName}</Div>
	</ListItemButton>
);

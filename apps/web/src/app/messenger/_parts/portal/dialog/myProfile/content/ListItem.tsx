import type { DialogStore } from "@repo/store";
import { type VoidNoArgs } from "@repo/types";
import { type VoidWithArg } from "@repo/types";
import { Flex } from "@repo/ui/box/flex";
import {
	ListItemButton,
	type ListItemButtonProps,
} from "@repo/ui/box/listItemButton";
import { Span } from "@repo/ui/box/span";
import {
	DynamicIcon,
	type IconComponentType,
} from "@repo/ui/icons/dynamicIcon";
import { type ElementLabel } from "@repo/ui/types";

interface Props extends ListItemButtonProps {
	label: ElementLabel;
	onClick: VoidNoArgs;
	value: string;
	Icon: IconComponentType;
}

export interface EditProfileListItem {
	Icon: IconComponentType;
	disabled: boolean;
	label: ElementLabel;
	name: DialogStore.DialogName;
	value: string;
}

export type OnProfileItemClick = VoidWithArg<EditProfileListItem>;

export const ListItem: React.FC<Props> = ({
	disabled,
	Icon,
	label,
	onClick,
	value,
	...rest
}) => (
	<ListItemButton
		{...rest}
		disabled={disabled}
		style={{
			alignItems: "center",
			borderRadius: "10px",
			display: "flex",
			gap: 10,
			height: "65px",
			width: "100%",
		}}
		onClick={onClick}
	>
		<DynamicIcon icon={Icon} />
		<Flex
			jc="space-between"
			style={{
				gap: 10,
				minWidth: 0,
				width: "90%",
			}}
		>
			<Span style={{ minWidth: "50px" }}>{label}</Span>
			<Span
				style={{
					color: "#1976d2",
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{value}
			</Span>
		</Flex>
	</ListItemButton>
);

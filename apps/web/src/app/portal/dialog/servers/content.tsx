import { ServerTestResult } from "@repo/hooks";
import { VoidWithArg } from "@repo/types";
import { Box } from "@repo/ui";

import { ServerStatusIndicator } from "~/components/Other";

interface Props {
	disabled: boolean;
	list: Array<ServerTestResult & { id: number }>;
	onListItemClick: VoidWithArg<number>;
}

export const Content: React.FC<Props> = ({
	list,
	onListItemClick,
	disabled,
}) => {
	return (
		<Box.List>
			{list.map((item, index) => {
				return (
					<Box.ListItemButton
						key={index}
						disabled={disabled}
						style={{ borderRadius: "10px" }}
						onClick={() => onListItemClick(item.id)}
					>
						<Box.ListItemText>{item.url}</Box.ListItemText>
						<Box.ListItemText style={{ textAlign: "end" }}>
							<Box.Span>
								<ServerStatusIndicator status={item.status} />
							</Box.Span>

							<Box.Span>{item.status}</Box.Span>
						</Box.ListItemText>
					</Box.ListItemButton>
				);
			})}
		</Box.List>
	);
};

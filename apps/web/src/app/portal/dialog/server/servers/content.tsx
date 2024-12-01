import { ServerTestResult } from "@repo/hooks";
import { VoidWithArg } from "@repo/types";
import { List, ListItemButton, ListItemText, Span } from "@repo/ui";

import { ServerStatusIndicator } from "../serverStatusIndicator";

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
		<List>
			{list.map((item, index) => {
				return (
					<ListItemButton
						key={index}
						disabled={disabled}
						style={{ borderRadius: "10px" }}
						onClick={() => onListItemClick(item.id)}
					>
						<ListItemText>{item.url}</ListItemText>
						<ListItemText style={{ textAlign: "end" }}>
							<Span>
								<ServerStatusIndicator status={item.status} />
							</Span>

							<Span>{item.status}</Span>
						</ListItemText>
					</ListItemButton>
				);
			})}
		</List>
	);
};
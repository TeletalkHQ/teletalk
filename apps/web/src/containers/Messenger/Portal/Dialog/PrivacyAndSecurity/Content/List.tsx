import { VoidWithArg } from "@repo/type-store";

import { Box } from "~/components";
import { GlobalStore } from "~/store";

import ListItem from "./ListItem";
import { privacyAndSecurityList } from "./data";

interface Props {
	onItemClick: VoidWithArg<GlobalStore.DialogName>;
}

const List: React.FC<Props> = ({ onItemClick }) => (
	<Box.List>
		{privacyAndSecurityList.map((item, index) => (
			<ListItem key={index} item={item} onItemClick={onItemClick} />
		))}
	</Box.List>
);

export default List;

import type { VoidNoArgs } from "@repo/types";
import { Div } from "@repo/ui/box/div";
import { IconButton } from "@repo/ui/button/icon";
import type { IconComponentType } from "@repo/ui/icons/dynamicIcon";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { Typography } from "@repo/ui/typography/typography";
import { BiTimer } from "react-icons/bi";
import { TbSortAscendingLetters } from "react-icons/tb";

export type SortType = "a-z" | "time";

interface Props {
	sortType: SortType;
	toggleSortType: VoidNoArgs;
}

export const Title: React.FC<Props> = ({ sortType, toggleSortType }) => {
	const SortIcon: Record<SortType, IconComponentType> = {
		"a-z": TbSortAscendingLetters,
		time: BiTimer,
	};

	const SelectedSortIcon = SortIcon[sortType];

	return (
		<Div className="flex flex-row justify-between items-center w-full">
			<Typography fontWeight="bold">Contacts</Typography>
			<IconButton onClick={toggleSortType}>
				<DynamicIcon icon={SelectedSortIcon} />
			</IconButton>
		</Div>
	);
};

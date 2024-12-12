import { BsTelephone } from "react-icons/bs";
import { FiAtSign } from "react-icons/fi";
import { RiAccountBoxLine } from "react-icons/ri";
import { TbAbc } from "react-icons/tb";

import {
	type EditProfileListItem,
	ListItem,
	type OnProfileItemClick,
} from "./ListItem";

interface Props {
	bio: string;
	fullName: string;
	fullNumber: string;
	onClick: OnProfileItemClick;
	username: string;
}

export const List: React.FC<Props> = ({
	bio,
	fullName,
	fullNumber,
	onClick,
	username,
}) => {
	const list: Array<EditProfileListItem> = [
		{
			disabled: false,
			Icon: TbAbc,
			label: "Bio",
			name: "editBio",
			value: bio,
		},
		{
			disabled: false,
			Icon: RiAccountBoxLine,
			label: "Name",
			name: "editFullName",
			value: fullName,
		},
		{
			disabled: true,
			Icon: BsTelephone,
			label: "Phone Number",
			name: "editPhoneNumber",
			value: fullNumber,
		},
		{
			disabled: false,
			Icon: FiAtSign,
			label: "Username",
			name: "editUsername",
			value: username || "Not set",
		},
	];

	return (
		<>
			{list.map((item, i) => (
				<ListItem
					key={i}
					disabled={item.disabled}
					Icon={item.Icon}
					label={item.label}
					value={item.value}
					onClick={() => onClick(item)}
				/>
			))}
		</>
	);
};

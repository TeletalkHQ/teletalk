// TODO: Move to `icons`
import {
	AccountBoxTwoToneIcon,
	AlternateEmailTwoToneIcon,
	CallTwoToneIcon,
	SettingsAccessibilityTwoToneIcon,
} from "@repo/ui";

import { EditProfileListItem, ListItem, OnProfileItemClick } from "./ListItem";

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
			Icon: SettingsAccessibilityTwoToneIcon,
			label: "Bio",
			name: "editBio",
			value: bio,
		},
		{
			disabled: false,
			Icon: AccountBoxTwoToneIcon,
			label: "Name",
			name: "editFullName",
			value: fullName,
		},
		{
			disabled: true,
			Icon: CallTwoToneIcon,
			label: "Phone Number",
			name: "editPhoneNumber",
			value: fullNumber,
		},
		{
			disabled: false,
			Icon: AlternateEmailTwoToneIcon,
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

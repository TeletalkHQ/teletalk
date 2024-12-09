import { type AvatarProps, Avatar as MuiAvatar } from "@mui/material";

export const Avatar: React.FC<AvatarProps> = (props) => {
	return <MuiAvatar {...props} />;
};

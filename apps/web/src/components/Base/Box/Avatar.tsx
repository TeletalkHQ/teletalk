import { AvatarProps, Avatar as MuiAvatar } from "@mui/material";

const Avatar: React.FC<AvatarProps> = (props) => {
  return <MuiAvatar {...props} />;
};

export default Avatar;

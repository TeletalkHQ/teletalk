import { Divider } from "@mui/material";
import type { AvatarSrc, Username } from "teletalk-type-store";

import { Box } from "~/components";

import { OnSettingItemClick } from "../types";
import List from "./List";
import ProfileOverview from "./ProfileOverview";

interface Props {
  avatarSrc: AvatarSrc;
  fullName: string;
  fullNumber: string;
  username: Username;
  onSettingItemClick: OnSettingItemClick;
}

const Content: React.FC<Props> = ({
  avatarSrc,
  fullName,
  fullNumber,
  onSettingItemClick,
  username,
}) => {
  return (
    <>
      <ProfileOverview
        avatarSrc={avatarSrc}
        fullName={fullName}
        fullNumber={fullNumber}
        username={username}
      />

      <Divider style={{ margin: "20px 0px 20px 0px" }} />

      <Box.List>
        <List onSettingItemClick={onSettingItemClick} />
      </Box.List>
    </>
  );
};

export default Content;

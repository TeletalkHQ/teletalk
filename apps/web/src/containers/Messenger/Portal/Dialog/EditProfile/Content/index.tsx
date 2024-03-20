import type { AvatarSrc } from "teletalk-type-store";

import { userUtils } from "~/classes/UserUtils";
import { Box } from "~/components";
import { Profile, VoidNoArgsFn } from "~/types";

import { EditProfileListItemOnClick } from "../types";
import Header from "./Header";
import List from "./List";

interface Props {
  avatarSrc: AvatarSrc;
  onAvatarClick: VoidNoArgsFn;
  onClick: EditProfileListItemOnClick;
  profile: Profile;
}

const Content: React.FC<Props> = ({
  avatarSrc,
  onAvatarClick,
  onClick,
  profile,
}) => {
  const fullName = userUtils.concatFirstNameWithLastName(profile);
  const fullNumber = userUtils.concatCountryCodeWithPhoneNumber(profile);

  return (
    <>
      <Box.Flex
        ai="center"
        col
        gap={1}
        jc="center"
        style={{ maxWidth: "400px" }}
      >
        <Header
          avatarSrc={avatarSrc}
          fullName={fullName}
          onAvatarClick={onAvatarClick}
        />

        <List
          bio={profile.bio}
          fullName={fullName}
          fullNumber={fullNumber}
          username={profile.username}
          onClick={onClick}
        />
      </Box.Flex>
    </>
  );
};

export default Content;

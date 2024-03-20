import type { AvatarSrc } from "teletalk-type-store";

import { Box } from "~/components";

interface Props {
  avatarSrc: AvatarSrc;
}

const Content: React.FC<Props> = ({ avatarSrc }) => {
  return (
    <>
      <Box.Flex
        ai="center"
        col
        jc="center"
        style={{
          width: "100%",
          minWidth: "300px",
          height: "300px",
        }}
      >
        <Box.Avatar
          alt="avatar"
          src={avatarSrc}
          style={{
            borderRadius: "10px",
            height: 200,
            width: 200,
          }}
        />
      </Box.Flex>
    </>
  );
};

export default Content;

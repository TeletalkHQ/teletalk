import type { AvatarSrc } from "teletalk-type-store";

import { Box, Typography } from "~/components";

interface Props {
  fullNumber: string;
  fullName: string;
  avatarSrc: AvatarSrc;
}

const PersonalData: React.FC<Props> = ({ fullName, fullNumber, avatarSrc }) => (
  <Box.Flex
    ai="center"
    col
    gap={1}
    jc="center"
    style={{
      padding: 10,
    }}
  >
    <Box.Div>
      <Box.Avatar src={avatarSrc} />
    </Box.Div>
    <Typography.Bold
      style={{
        fontSize: 18,
      }}
    >
      {fullName}
    </Typography.Bold>
    <Box.Div
      style={{
        fontSize: 14,
      }}
    >
      {fullNumber}
    </Box.Div>
  </Box.Flex>
);

export default PersonalData;

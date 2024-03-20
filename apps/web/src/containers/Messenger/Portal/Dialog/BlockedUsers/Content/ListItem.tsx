import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";

import { userUtils } from "~/classes/UserUtils";
import { Box, Button } from "~/components";
import { useGetPublicData } from "~/hooks";
import { UserItem, VoidNoArgsFn } from "~/types";

interface Props {
  userItem: UserItem;
  onItemLick: VoidNoArgsFn;
}

const ListItem: React.FC<Props> = ({ userItem, onItemLick }) => {
  const { publicData } = useGetPublicData(userItem.userId);

  return (
    <Box.ListItemButton
      style={{
        alignItems: "center",
        borderRadius: "10px",
        display: "flex",
        gap: 10,
        height: "65px",
        justifyContent: "space-between",
      }}
      onClick={onItemLick}
    >
      <Box.Span>
        <Box.Avatar style={{ width: "50px", height: "50px" }} />
      </Box.Span>
      <Box.Span
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Box.Span>
          {userUtils.concatFirstNameWithLastName(userItem, publicData)}
        </Box.Span>
        <Box.Span>
          {userUtils.concatCountryCodeWithPhoneNumber(
            userItem,
            "unknown phone number"
          )}
        </Box.Span>
      </Box.Span>
      <Box.Span>
        <Button.Icon
          onClick={(e) => {
            e.stopPropagation();
            onItemLick();
          }}
        >
          <LockOpenTwoToneIcon color="error" />
        </Button.Icon>
      </Box.Span>
    </Box.ListItemButton>
  );
};

export default ListItem;

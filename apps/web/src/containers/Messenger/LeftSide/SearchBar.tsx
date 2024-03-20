import { Box, Button, Icon } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onDrawerIconClick: VoidNoArgsFn;
}

const SearchBar: React.FC<Props> = ({ onDrawerIconClick }) => {
  return (
    <Box.Paper
      style={{
        width: "100%",

        height: 50,
        borderRadius: "0px",
        padding: "0px",
      }}
    >
      <Box.Flex
        ai="center"
        gap={1}
        jc="space-between"
        style={{ width: "100%" }}
      >
        <Box.Div style={{ padding: "5px 15px" }}>
          <Button.Icon onClick={onDrawerIconClick}>
            <Icon.Menu.Element />
          </Button.Icon>
        </Box.Div>
        {/*
        <Box.Div style={{ width: "90%", marginRight: 5 }}>
          <Input.Text
            fullWidth
            size="small"
            placeholder="Search"
            InputProps={{
              style: { borderRadius: 10 },
              startAdornment: (
                <InputAdornment position="start">
                  <Icons.Search.Icon />
                </InputAdornment>
              ),
            }}
          />
        </Box.Div> */}
      </Box.Flex>
    </Box.Paper>
  );
};

export default SearchBar;

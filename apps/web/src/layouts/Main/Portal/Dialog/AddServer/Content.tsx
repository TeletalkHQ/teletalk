import { FormControl, InputLabel } from "@mui/material";

import { Box, Components, Input } from "~/components";
import { CommonOnChange, CommonSelectOnChange, Status } from "~/types";

interface Props {
  disabled: boolean;
  inputValue: string;
  onChange: CommonOnChange;
  onSelectChange: CommonSelectOnChange;
  protocol: string;
  status: Status;
}

const Content: React.FC<Props> = ({
  disabled,
  inputValue,
  onChange,
  onSelectChange,
  protocol,
  status,
}) => {
  return (
    <Box.Flex col gap="5px" style={{ maxWidth: "400px" }}>
      <Components.ServerStatus status={status} />

      <Box.Flex ai="center" jc="space-between" width="100%">
        <FormControl fullWidth style={{ width: "25%" }}>
          <InputLabel>Protocol</InputLabel>
          <Input.Base.Select
            defaultValue={protocol}
            disabled={disabled}
            label="Protocol"
            value={protocol}
            onChange={onSelectChange}
          >
            {["http", "https"].map((item, index) => (
              <Box.MenuItem key={index} value={item}>
                {item}
              </Box.MenuItem>
            ))}
          </Input.Base.Select>
        </FormControl>

        <Input.Base.Text
          disabled={disabled}
          label="Url"
          style={{ width: "73%" }}
          value={inputValue}
          onChange={onChange}
        />
      </Box.Flex>
    </Box.Flex>
  );
};

export default Content;

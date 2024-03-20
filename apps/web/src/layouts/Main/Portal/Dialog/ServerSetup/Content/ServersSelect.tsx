import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { appConfigs } from "~/classes/AppConfigs";
import { Box, Input } from "~/components";
import { Url, VoidWithArg } from "~/types";

interface Props {
  disabled: boolean;
  onServerSelectChange: VoidWithArg<Url>;
  selectedServer: string;
}

const ServerSelect: React.FC<Props> = ({
  disabled,
  onServerSelectChange,
  selectedServer,
}) => {
  return (
    <>
      <FormControl disabled={disabled} fullWidth>
        <InputLabel id="labelId">Selected server</InputLabel>
        <Input.Base.Select
          defaultValue={selectedServer}
          label="Selected server"
          labelId="labelId"
          size="small"
          value={selectedServer}
          onChange={(props) => onServerSelectChange(props.target.value as Url)}
        >
          {appConfigs.getConfigs().api.servers.map((item, index) => (
            <Box.MenuItem key={index} value={item.url}>
              {item.url}
            </Box.MenuItem>
          ))}
        </Input.Base.Select>
      </FormControl>
    </>
  );
};

export default ServerSelect;

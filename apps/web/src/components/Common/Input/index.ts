import { Button } from "./Button";
import { FileInput } from "./File";
import { Select } from "./Select";
import { TextWithValidator } from "./TextWithValidator";

export const CommonInput = {
  Button,
  Select,
  File: FileInput,
  Text: {
    ...TextWithValidator,
  },
};

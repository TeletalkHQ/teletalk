import { DialogName, VoidWithArg } from "~/types";

import List from "./List";

interface Props {
  onItemClick: VoidWithArg<DialogName>;
}

const Content: React.FC<Props> = ({ onItemClick }) => (
  <>
    <List onItemClick={onItemClick} />
  </>
);

export default Content;

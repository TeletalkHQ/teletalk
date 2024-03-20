import { Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onClose: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ onClose }) => (
  <>
    <Button.PrimaryClose onClick={onClose} />
  </>
);

export default Actions;

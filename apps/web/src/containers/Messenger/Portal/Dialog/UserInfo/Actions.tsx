import { Button } from "~/components";
import { CommonOnClose } from "~/types";

interface Props {
  onClose: CommonOnClose;
}

const Actions: React.FC<Props> = ({ onClose }) => (
  <>
    <Button.PrimaryClose onClick={onClose} />
  </>
);

export default Actions;

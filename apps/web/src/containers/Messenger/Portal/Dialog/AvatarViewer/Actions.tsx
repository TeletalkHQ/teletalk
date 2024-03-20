import { Button } from "~/components";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  onClose: CommonOnClose;
  onEdit: VoidNoArgsFn;
  onDelete: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ onClose, onDelete, onEdit }) => (
  <>
    <Button.PrimaryClose onClick={onClose} />
    <Button.Primary onClick={onEdit}>Edit</Button.Primary>
    <Button.Secondary onClick={onDelete}>Delete</Button.Secondary>
  </>
);

export default Actions;

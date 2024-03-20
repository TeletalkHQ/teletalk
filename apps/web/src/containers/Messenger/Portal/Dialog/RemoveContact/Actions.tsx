import { Button } from "~/components";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onClose: CommonOnClose;
  onRemove: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ loading, onClose, onRemove }) => (
  <>
    <Button.PrimaryClose onClick={onClose} />

    <Button.SecondaryConfirm loading={loading} onClick={onRemove} />
  </>
);

export default Actions;

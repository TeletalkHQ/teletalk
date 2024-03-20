import { Button } from "~/components";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onCancel: CommonOnClose;
  onConfirm: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ loading, onCancel, onConfirm }) => {
  return (
    <>
      <Button.PrimaryClose onClick={onCancel} />

      <Button.SecondaryConfirm loading={loading} onClick={onConfirm} />
    </>
  );
};

export default Actions;

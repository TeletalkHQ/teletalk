import { Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onCancel: VoidNoArgsFn;
  onSaveClick: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ loading, onCancel, onSaveClick }) => (
  <>
    <Button.SecondaryCancel onClick={onCancel} />
    <Button.PrimaryConfirm loading={loading} onClick={onSaveClick} />
  </>
);

export default Actions;

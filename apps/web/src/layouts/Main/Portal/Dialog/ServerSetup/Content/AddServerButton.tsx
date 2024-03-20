import { Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  disabled: boolean;
  onAddServerClick: VoidNoArgsFn;
}

const AddServerButton: React.FC<Props> = ({ disabled, onAddServerClick }) => {
  return (
    <>
      <Button.Primary disabled={disabled} onClick={onAddServerClick}>
        Add server
      </Button.Primary>
    </>
  );
};

export default AddServerButton;

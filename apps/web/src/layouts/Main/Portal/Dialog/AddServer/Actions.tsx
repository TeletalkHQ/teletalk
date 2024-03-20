import { Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  isAddDisabled: boolean;
  isCloseDisabled: boolean;
  isTestDisabled: boolean;
  loading: boolean;
  onAddClick: VoidNoArgsFn;
  onClose: VoidNoArgsFn;
  onTestClick: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({
  isAddDisabled,
  isCloseDisabled,
  isTestDisabled,
  loading,
  onAddClick,
  onClose,
  onTestClick,
}) => {
  return (
    <>
      <Button.PrimaryClose disabled={isCloseDisabled} onClick={onClose} />
      <Button.Primary
        disabled={isTestDisabled}
        loading={loading}
        loadingIndicatorText="Testing..."
        onClick={onTestClick}
      >
        Test
      </Button.Primary>

      <Button.Primary
        disabled={isAddDisabled}
        loadingIndicatorText="Adding..."
        onClick={onAddClick}
      >
        Add
      </Button.Primary>
    </>
  );
};

export default Actions;

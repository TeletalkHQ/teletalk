import { Button } from "~/components";
import { Status, VoidNoArgsFn } from "~/types";

interface Props {
  disabled: boolean;
  loading: boolean;
  onSetup: VoidNoArgsFn;
  status: Status;
}

const ServerSetupActions: React.FC<Props> = ({
  disabled,
  loading,
  onSetup,
  status,
}) => {
  return (
    <>
      <Button.Primary
        disabled={disabled}
        loading={loading}
        loadingIndicatorText={
          status === "online" ? "Forwarding..." : "Trying..."
        }
        onClick={onSetup}
      >
        Setup
      </Button.Primary>
    </>
  );
};

export default ServerSetupActions;

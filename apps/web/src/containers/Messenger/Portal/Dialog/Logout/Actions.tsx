import { Box, Button } from "~/components";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onClose: CommonOnClose;
  onLogout: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ loading, onClose, onLogout }) => (
  <>
    <Box.Div style={{ width: "35%" }}>
      <Button.PrimaryClose onClick={onClose} />
    </Box.Div>

    <Box.Div
      style={{
        width: "65%",
      }}
    >
      <Button.Secondary
        loading={loading}
        loadingIndicatorText="Logging out..."
        onClick={onLogout}
      >
        Log out
      </Button.Secondary>
    </Box.Div>
  </>
);

export default Actions;

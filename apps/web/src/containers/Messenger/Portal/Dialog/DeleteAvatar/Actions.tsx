import { Box, Button } from "~/components";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onClose: CommonOnClose;
  onDelete: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ loading, onClose, onDelete }) => (
  <>
    <Box.Div style={{ width: "65%" }}>
      <Button.PrimaryClose onClick={onClose} />
    </Box.Div>

    <Box.Div
      style={{
        width: "35%",
      }}
    >
      <Button.SecondaryConfirm
        loading={loading}
        loadingIndicatorText="Deleting..."
        onClick={onDelete}
      />
    </Box.Div>
  </>
);

export default Actions;

import { Box } from "../Box";

interface Props {
  label: string;
}

const Divider: React.FC<Props> = ({ label }) => {
  return (
    <Box.Div style={{ display: "flex", alignItems: "center" }}>
      <Box.Div
        style={{
          borderBottom: "2px solid lightgray",
          width: "95%",
          marginRight: "5px",
        }}
      />
      <Box.Div
        style={{
          padding: label ? "0px 10px" : "",
          margin: "5px 0px 10px",
          whiteSpace: "nowrap",
          color: "gray",
          fontWeight: "bold",
        }}
      >
        {label}
      </Box.Div>
      <Box.Div
        style={{
          borderBottom: "2px solid lightgray",
          width: "95%",
          marginLeft: "5px",
        }}
      />
    </Box.Div>
  );
};

export default Divider;

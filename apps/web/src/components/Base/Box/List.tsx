import { ListProps, List as MuiList } from "@mui/material";

const List: React.FC<ListProps> = (props) => {
  return <MuiList {...props} />;
};

export default List;

import { Components, Loading } from "~/components";
import AddServer from "~/layouts/Main/Portal/Dialog/AddServer";
import ServerSetup from "~/layouts/Main/Portal/Dialog/ServerSetup";
import Servers from "~/layouts/Main/Portal/Dialog/Servers";

interface Props {
  children: JSX.Element;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Loading.FullPageLoading />
      <Loading.OverlayLoading />
      <Components.Base.ContextMenu />

      {[AddServer, ServerSetup, Servers].map((Component, i) => (
        <Component key={i} />
      ))}

      {children}
    </>
  );
};

export default MainLayout;

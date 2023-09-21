import { Outlet } from "@solidjs/router";
import { ParentComponent } from "solid-js";

const Fragment: ParentComponent = (props) => {
  return <>{props.children || <Outlet />}</>;
};

export default Fragment;

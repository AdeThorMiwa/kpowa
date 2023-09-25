import { Component, createEffect } from "solid-js";
import { useAuthState } from "../../state/auth";
import { Outlet, useNavigate } from "@solidjs/router";

const AllowAuthenticated: Component = (props) => {
  const { authenticated } = useAuthState();
  const navigate = useNavigate();

  createEffect(() => {
    if (!authenticated()) {
      navigate("/login", { replace: true });
    }
  });

  return <Outlet />;
};

export default AllowAuthenticated;

import { Outlet, useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";
import { useAuthState } from "../../state/auth";

const AllowUnauthenticatedOnly: Component = () => {
  const { authenticated } = useAuthState();
  const navigate = useNavigate();

  createEffect(() => {
    if (authenticated()) {
      navigate("/", { replace: true });
    }
  });

  return <Outlet />;
};

export default AllowUnauthenticatedOnly;

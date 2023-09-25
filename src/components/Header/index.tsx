import { Component } from "solid-js";
import Button from "../Button";
import { useAuthState } from "../../state/auth";

const PageHeader: Component = () => {
  const { logout } = useAuthState();

  return (
    <header class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold my-4">
        Kill<span class="text-blue-800">powa</span>
      </h1>
      <Button text="Logout" onclick={logout} class="!w-[80px]" />
    </header>
  );
};

export default PageHeader;

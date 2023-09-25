import { Component } from "solid-js";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useLogin from "../../hooks/useLogin";

const LoginPage: Component = () => {
  const { username, error, loading, onInputHandler, onFormSubmit } = useLogin();

  return (
    <section class="container mx-auto w-screen flex justify-center items-center h-screen flex-col">
      <h1 class="text-2xl font-bold">
        Kill<span class="text-blue-800">powa</span> Server
      </h1>
      <h4 class="mt-2">Login to get access to our server.</h4>
      <form onSubmit={onFormSubmit} class="mt-5 w-full max-w-sm flex flex-col">
        <Input
          type="text"
          label="Enter username"
          placeholder="Username"
          required
          value={username()}
          onInput={onInputHandler}
          error={error()}
        />
        <Button
          type="submit"
          text="Continue"
          class="self-end"
          loading={loading}
        />
      </form>
    </section>
  );
};

export default LoginPage;

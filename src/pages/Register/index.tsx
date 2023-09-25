import { Component } from "solid-js";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useRegister from "../../hooks/useRegister";

const RegisterPage: Component = () => {
  const {
    username,
    inviteCode,
    errors,
    loading,
    onInputHandler,
    onFormSubmit,
  } = useRegister();

  return (
    <section class="container mx-auto w-screen flex justify-center items-center h-screen flex-col">
      <h1 class="text-2xl font-bold">
        Kill<span class="text-blue-800">powa</span> Server
      </h1>
      <h4 class="mt-2">Register or login to get access to our server.</h4>
      <form onSubmit={onFormSubmit} class="mt-5 w-full max-w-sm flex flex-col">
        <Input
          type="text"
          name="username"
          label="Enter username"
          placeholder="Username"
          required
          value={username()}
          onInput={onInputHandler}
          error={errors().username}
        />
        <Input
          type="text"
          name="inviteCode"
          label="Enter invite code"
          placeholder="Invite code"
          value={inviteCode()}
          onInput={onInputHandler}
          error={errors().inviteCode}
          class="mt-4"
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

export default RegisterPage;

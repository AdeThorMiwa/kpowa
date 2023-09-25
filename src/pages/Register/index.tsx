import { Component } from "solid-js";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useRegister from "../../hooks/useRegister";
import AuthLayout from "../../layouts/AuthLayout";
import { A } from "@solidjs/router";

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
    <AuthLayout
      title="Register to get access to our server."
      loading={loading()}
      onSubmit={onFormSubmit}
      footer={{
        text: "Already a member? ",
        linkHref: "/login",
        linkText: "Login",
      }}
    >
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
    </AuthLayout>
  );
};

export default RegisterPage;

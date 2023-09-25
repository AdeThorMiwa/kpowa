import { Component } from "solid-js";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useLogin from "../../hooks/useLogin";
import AuthLayout from "../../layouts/AuthLayout";

const LoginPage: Component = () => {
  const { username, error, loading, onInputHandler, onFormSubmit } = useLogin();

  return (
    <AuthLayout
      title="Login to get access to our server."
      loading={loading()}
      onSubmit={onFormSubmit}
      footer={{
        text: "Don't have an account? ",
        linkHref: "/register",
        linkText: "Register",
      }}
    >
      <Input
        type="text"
        label="Enter username"
        placeholder="Username"
        required
        value={username()}
        onInput={onInputHandler}
        error={error()}
      />
    </AuthLayout>
  );
};

export default LoginPage;

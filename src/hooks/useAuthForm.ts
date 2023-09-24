import { createSignal } from "solid-js";
import { useAuthState } from "../state/auth";
import { useSearchParams } from "@solidjs/router";
import { authenticateUser } from "../lib/api";

const useAuthForm = () => {
  const { authenticate } = useAuthState();
  const [query] = useSearchParams();
  const [username, setUsername] = createSignal<string>();
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string>();

  const onInputHandler = (
    e: InputEvent & {
      target: HTMLInputElement;
    }
  ) => {
    setUsername(e.target.value);
    setError(e.target.validationMessage);
  };

  const onFormSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    try {
      // make request and authenticate
      const res = await authenticateUser(username()!, query.invite_code);

      authenticate(res);
    } catch (e) {
      alert("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    error,
    loading,
    onInputHandler,
    onFormSubmit,
  };
};

export default useAuthForm;

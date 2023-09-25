import { createSignal } from "solid-js";
import { useAuthState } from "../state/auth";
import { authenticateUser } from "../lib/api";
import toast from "solid-toast";

const useLogin = () => {
  const { authenticate } = useAuthState();
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
      const res = await authenticateUser(username()!);

      authenticate(res);
    } catch (e) {
      toast.error("Login failed. Please try again");
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

export default useLogin;

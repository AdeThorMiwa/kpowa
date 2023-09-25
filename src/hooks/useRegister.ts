import { createSignal } from "solid-js";
import { useAuthState } from "../state/auth";
import { authenticateUser } from "../lib/api";

const useRegister = () => {
  const { authenticate } = useAuthState();
  const [values, setValues] = createSignal({
    username: "",
    inviteCode: undefined,
  });

  const [loading, setLoading] = createSignal(false);
  const [errors, setErrors] = createSignal({
    username: "",
    inviteCode: "",
  });

  const onInputHandler = (
    e: InputEvent & {
      target: HTMLInputElement;
    }
  ) => {
    setValues({ ...values(), [e.target.name]: e.target.value });
    setErrors({ ...errors(), [e.target.name]: e.target.validationMessage });
  };

  const onFormSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    try {
      // make request and authenticate
      const res = await authenticateUser(
        values().username,
        values().inviteCode
      );

      authenticate(res);
    } catch (e) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    username: () => values().username,
    inviteCode: () => values().inviteCode,
    errors,
    loading,
    onInputHandler,
    onFormSubmit,
  };
};

export default useRegister;

import { createSignal } from "solid-js";
import RTC from "../lib/rtc";

const useAuthForm = () => {
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
      const sdp = await RTC.getNewSDP();
      const payload = {
        username: username(),
        sdp,
      };

      // make request and authenticate
    } catch (e) {
    } finally {
      //   setLoading(false);
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

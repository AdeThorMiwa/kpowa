import { createSignal } from "solid-js";
import RTC from "../lib/rtc";
import { useAuthState } from "../state/auth";
import { User } from "../types/user";

const useAuthForm = () => {
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
      const sdp = await RTC.getNewSDP();
      const payload = {
        username: username(),
        sdp,
      };

      // make request and authenticate
      const user: User = {
        username: username()!,
        inviteCode: username()?.slice(0, 3) + "0465",
        referrals: 10,
      };
      authenticate(user);
    } catch (e) {
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

import { Accessor, Component, JSX } from "solid-js";
import cn from "classnames";
import Loader from "../Loader";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  loading?: Accessor<boolean>;
};

const Button: Component<ButtonProps> = (props) => {
  const loading = () => (props.loading ? props.loading() : false);

  return (
    <button
      {...props}
      class={cn(
        "w-full bg-blue-800 border-none mt-2 text-white px-3 py-1.5 text-sm h-[34px] flex justify-center items-center",
        props.class,
        {
          "cursor-not-allowed opacity-50": props.disabled,
        }
      )}
      disabled={props.disabled || loading()}
    >
      {loading() ? <Loader /> : props.text}
    </button>
  );
};

export default Button;

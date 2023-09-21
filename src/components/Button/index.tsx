import { Accessor, Component, JSX, createMemo } from "solid-js";
import cn from "classnames";
import Loader from "../Loader";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  loading?: Accessor<boolean>;
};

const Button: Component<ButtonProps> = ({ text, ...rest }) => {
  const loading = createMemo(() => (rest.loading ? rest.loading() : false));

  return (
    <button
      {...rest}
      class={cn(
        "w-full bg-blue-800 border-none mt-2 text-white px-3 py-1.5 text-sm h-[34px] flex justify-center items-center",
        rest.class
      )}
      disabled={rest.disabled || loading()}
    >
      {loading() ? <Loader /> : text}
    </button>
  );
};

export default Button;

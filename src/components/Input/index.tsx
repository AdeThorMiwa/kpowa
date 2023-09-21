import { Accessor, Component, JSX } from "solid-js";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error: Accessor<string | undefined>;
};

const Input: Component<InputProps> = ({ label, error, ...rest }) => {
  return (
    <div class="w-full">
      <label class="block">{label}</label>
      <input
        class="w-full border-2 border-gray-400 mt-1.5 px-3 py-1.5 focus:outline-none focus:ring-0 focus:border-blue-800 transition-all duration-300"
        {...rest}
      />
      <span class="text-xs text-red-600">{error()}</span>
    </div>
  );
};

export default Input;

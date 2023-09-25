import { Component, JSX } from "solid-js";
import cn from "classnames";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input: Component<InputProps> = (props) => {
  const error = () => props.error;

  return (
    <div class={cn("w-full", props.class)}>
      <label class="block">
        {props.label}
        {props.required && <sup class="text-red-600">*</sup>}
      </label>
      <input
        {...props}
        class="w-full border-2 border-gray-400 mt-1.5 px-3 py-1.5 focus:outline-none focus:ring-0 focus:border-blue-800 transition-all duration-300"
      />
      {props.error && <span class="text-xs text-red-600">{error()}</span>}
    </div>
  );
};

export default Input;

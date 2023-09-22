import { Component, createSignal } from "solid-js";
import cn from "classnames";

type CopiableProps = {
  text: string;
  copyValue?: string;
  class?: string;
};

const Copiable: Component<CopiableProps> = ({ text, copyValue, ...rest }) => {
  const [copied, setCopied] = createSignal(false);

  const onCopyHandler = () => {
    navigator.clipboard
      .writeText(copyValue || text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 600);
      })
      .catch(() => alert("Clipboard not available"));
  };

  return (
    <span class="inline-flex">
      <b class={cn("text-blue-800", rest.class)}>
        {copied() ? "Copied" : text}
      </b>{" "}
      <button onClick={onCopyHandler}>
        <img
          srcset="https://img.icons8.com/?size=24&amp;id=pNYOTp5DinZ3&amp;format=png 1x, https://img.icons8.com/?size=48&amp;id=pNYOTp5DinZ3&amp;format=png 2x"
          width="24"
          height="24"
          alt="Copy icon"
        />
      </button>
    </span>
  );
};

export default Copiable;

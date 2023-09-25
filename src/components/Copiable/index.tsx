import { Component, createSignal } from "solid-js";
import cn from "classnames";
import { toast } from "solid-toast";

type CopiableProps = {
  text: string | undefined;
  copyValue?: string;
  class?: string;
};

const Copiable: Component<CopiableProps> = (props) => {
  const [copied, setCopied] = createSignal(false);
  const copyValue = () => props.copyValue || props.text || "";
  const text = () => props.text;

  const onCopyHandler = () => {
    navigator.clipboard
      .writeText(copyValue())
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 600);
      })
      .catch(() => toast("Clipboard not available"));
  };

  return (
    <span class="inline-flex">
      <b class={cn("text-blue-800", props.class)}>
        {copied() ? "Copied" : text()}
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

import { Component, createSignal } from "solid-js";

type CopiableProps = {
  text: string;
  copyValue?: string;
};

const Copiable: Component<CopiableProps> = ({ text, copyValue }) => {
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
    <span>
      <b class="text-lg text-blue-800">{copied() ? "Copied" : text}</b>{" "}
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

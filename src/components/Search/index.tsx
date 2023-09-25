import { Component, createSignal } from "solid-js";
import Input from "../../components/Input";

type SearchProps = {
  onSubmit: (value: string) => void;
};

const Search: Component<SearchProps> = (props) => {
  const [searchString, setSearchString] = createSignal("");
  const hasValue = () => searchString().trim().length > 0;

  const onSubmitHandler = (e: Event) => {
    e.preventDefault();
    props.onSubmit(searchString().trim());
  };

  return (
    <form class="mt-4" onSubmit={onSubmitHandler}>
      <Input
        type="search"
        placeholder="Search username.."
        value={searchString()}
        onInput={(e) => setSearchString(e.target.value)}
      />
      <p
        class="text-xs text-blue-800 text-right transition-all"
        classList={{ invisible: !hasValue() }}
      >
        Press enter to apply search!
      </p>
    </form>
  );
};

export default Search;

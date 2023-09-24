import { Component, Setter, createSignal } from "solid-js";
import Input from "../../components/Input";

type SearchProps = {
  searchString: string;
  setSearchString: Setter<string>;
};

const Search: Component<SearchProps> = (props) => {
  const searchString = () => props.searchString;

  return (
    <div class="mt-4">
      <Input
        type="search"
        placeholder="Search username.."
        value={searchString()}
        onInput={(e) => props.setSearchString(e.target.value)}
      />
    </div>
  );
};

export default Search;

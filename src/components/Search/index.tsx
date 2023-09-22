import { Component, createSignal } from "solid-js";
import Input from "../../components/Input";

type SearchProps = {
  onSearch(query: string): void;
};

const Search: Component<SearchProps> = (props) => {
  const [searchQuery, setSearchQuery] = createSignal("");

  const onSearchHandler = (e: Event) => {
    e.preventDefault();
    props.onSearch(searchQuery());
  };

  return (
    <form class="mt-4" onSubmit={onSearchHandler}>
      <Input
        type="search"
        placeholder="Search username.."
        value={searchQuery()}
        onInput={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default Search;

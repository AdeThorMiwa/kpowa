import { TransitionGroup } from "solid-transition-group";
import {
  Component,
  For,
  Match,
  Show,
  Switch,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";
import UserListItem from "../UserListItem";
import Search from "../Search";
import { getUsers } from "../../lib/api";
import { createQuery } from "@tanstack/solid-query";
import { useAuthState } from "../../state/auth";
import Loader from "../Loader";

const UserList: Component = () => {
  const { authenticated } = useAuthState();
  const [username, setUsername] = createSignal("");
  const [page, setPage] = createSignal(1);

  const query = createQuery(
    () => [`users`, username(), page()],
    () => getUsers({ username: username(), page: page() }),
    {
      keepPreviousData: true,
      get enabled() {
        return authenticated();
      },
    }
  );

  createEffect(() => {
    let listener = (e: Event) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (query.data?.hasNext && !query.isFetching) setPage(page() + 1);
      }
    };

    window.addEventListener("scroll", listener);
    onCleanup(() => window.removeEventListener("scroll", listener));
  });

  const onSumbitHandler = (value: string) => {
    setUsername(value);
  };

  return (
    <>
      <Search onSubmit={onSumbitHandler} />
      <section class="mt-8 w-full mb-6">
        <h3 class="text-lg">Users</h3>
        <Switch>
          <Match when={query.isError}>Error: {query.error as string}</Match>
          <Match when={query.isSuccess || query.isFetching}>
            <TransitionGroup name="list-item">
              <For each={query.data?.users}>
                {(user) => <UserListItem {...user} />}
              </For>
            </TransitionGroup>
            <Show when={query.isFetching}>
              <div class="text-blue-800 flex w-full justify-center my-5">
                <Loader />
              </div>
            </Show>
          </Match>
        </Switch>
      </section>
    </>
  );
};

export default UserList;

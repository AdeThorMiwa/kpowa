import { TransitionGroup } from "solid-transition-group";
import { Component, For, createSignal } from "solid-js";
import UserListItem from "../UserListItem";
import { User } from "../../types/user";
import Search from "../Search";

const UserList: Component = () => {
  const [numList, setNumList] = createSignal<User[]>([
    {
      username: "Ademide",
      inviteCode: "Ade1237",
      referrals: 3,
    },
    {
      username: "Parallax",
      inviteCode: "Par0824",
      referrals: 20,
    },
  ]);

  const onSearchHandler = (searchQuery: string) => {
    console.log("query is: ", searchQuery);
  };

  return (
    <>
      <Search onSearch={onSearchHandler} />
      <section class="mt-8 w-full">
        <TransitionGroup name="list-item">
          <For each={numList()}>{(user, i) => <UserListItem {...user} />}</For>
        </TransitionGroup>
      </section>
    </>
  );
};

export default UserList;

import { TransitionGroup } from "solid-transition-group";
import {
  Component,
  Index,
  Suspense,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
} from "solid-js";
import UserListItem from "../UserListItem";
import Search from "../Search";
import { getUsers } from "../../lib/api";
import Loader from "../Loader";
import Button from "../Button";
import { AppServerEventKind } from "../../types/event";
import { User } from "../../types/user";
import { onNewReferral } from "./handler";
import EventBus from "../../lib/eventBus";

const UserList: Component = () => {
  const [username, setUsername] = createSignal("");
  const [page, setPage] = createSignal(1);

  const [res, { mutate }] = createResource(
    () => ({ username: username(), page: page() }),
    getUsers
  );

  const canNext = () => res()?.hasNext;
  const canPrev = () => res()?.hasPrev;
  const users = () => res()?.users;

  createEffect(() => {
    const unsubscribe = EventBus.subscribe(
      AppServerEventKind.NewReferral,
      (e) => onNewReferral(e, mutate, users)
    );

    onCleanup(() => unsubscribe());
  });

  createEffect(() => {
    const unsubscribe = EventBus.subscribe<{ data: User }>(
      AppServerEventKind.NewRegister,
      (e) => {
        mutate((res: any) => ({ ...res, users: [e.data, ...res?.users] }));
      }
    );

    onCleanup(() => unsubscribe());
  });

  const onSumbitHandler = (value: string) => {
    setUsername(value);
    setPage(1);
  };

  const ListLoader = () => (
    <div class="text-blue-800 flex w-full justify-center my-5">
      <Loader />
    </div>
  );

  return (
    <>
      <Search onSubmit={onSumbitHandler} />
      <section class="mt-8 w-full mb-6">
        <h3 class="text-lg">Users</h3>

        <Suspense fallback={<ListLoader />}>
          <TransitionGroup name="list-item">
            <Index each={users()}>
              {(user) => <UserListItem {...user()} />}
            </Index>
          </TransitionGroup>
          <div class="flex mt-8">
            <Button
              disabled={!canPrev()}
              onClick={() => setPage(page() - 1)}
              text="Prev"
              class="!w-[100px]"
            />
            <Button
              disabled={!canNext()}
              onClick={() => setPage(page() + 1)}
              text="Next"
              class="!w-[100px] ml-5"
            />
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default UserList;

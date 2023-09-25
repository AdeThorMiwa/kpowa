import { TransitionGroup } from "solid-transition-group";
import {
  Component,
  For,
  Index,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import UserListItem from "../UserListItem";
import Search from "../Search";
import { getUsers } from "../../lib/api";
import Loader from "../Loader";
import Button from "../Button";
import { EventBus } from "../../lib/eventManager";
import { AppServerEventKind } from "../../types/event";
import { User } from "../../types/user";

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
    EventBus.subscribe<{ referrer: string; referred_user: string }>(
      AppServerEventKind.NewReferral,
      (e) => {
        mutate((res: any) => ({
          ...res,
          users: users()?.map((user: User) => {
            if (user.username === e.data.referrer)
              return { ...user, referrals: user.referrals + 1 };
            else return user;
          }),
        }));
      }
    );
  });

  createEffect(() => {
    EventBus.subscribe<{ data: User }>(AppServerEventKind.NewRegister, (e) => {
      mutate((res: any) => ({ ...res, users: [e.data, ...res?.users] }));
    });
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
              class="w-[100px]"
            />
            <Button
              disabled={!canNext()}
              onClick={() => setPage(page() + 1)}
              text="Next"
              class="w-[100px] ml-5"
            />
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default UserList;

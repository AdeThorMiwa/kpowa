import { Setter } from "solid-js";
import { EventBusEvent } from "../../types/event";
import { PaginatedUserList, User } from "../../types/user";

export const onNewReferral = (
  e: EventBusEvent<{ referrer: string; referred_user: string }>,
  mutate: Setter<PaginatedUserList | undefined>,
  users: () => User[] | undefined
) => {
  mutate((res: any) => ({
    ...res,
    users: users()?.map((user: User) => {
      if (user.username === e.data?.referrer)
        return { ...user, referrals: user.referrals + 1 };
      else return user;
    }),
  }));
};

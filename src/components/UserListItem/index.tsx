import { Component } from "solid-js";
import Copiable from "../../components/Copiable";
import { User } from "../../types/user";

const UserListItem: Component<User> = (props) => {
  const inviteCode = () => props.inviteCode;
  return (
    <article class="flex flex-col md:flex-row w-full mt-4">
      <div class="w-full h-[120px] md:w-12 md:h-12  border border-blue-800 p-[1px] rounded-md flex justify-center items-center">
        <span class="w-full uppercase h-full bg-blue-800 text-white rounded-md text-xl flex items-center justify-center">
          {props.username && props.username[0]}
        </span>
      </div>
      <div class="mt-4 md:mt-0 md:ml-4 w-full">
        <h3 class="text-lg">{props.username}</h3>
        <div class="flex justify-between w-full items-baseline">
          <h5 class="text-xs md:text-sm">
            <span class="hidden md:inline">Number of </span> Referrals:{" "}
            <b class="text-md text-blue-800">{props.referrals}</b>
          </h5>
          <h5 class="text-xs md:text-sm">
            Invite Code: <Copiable text={inviteCode()} />
          </h5>
        </div>
      </div>
    </article>
  );
};

export default UserListItem;

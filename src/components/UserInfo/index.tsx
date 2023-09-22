import Copiable from "../Copiable";

const UserInfo = () => {
  return (
    <div>
      <div class="w-28 h-28 border-2 border-blue-800 p-0.5 rounded-lg flex justify-center items-center">
        <span class="w-full h-full bg-blue-800 text-white rounded-md text-6xl flex items-center justify-center">
          J
        </span>
      </div>
      <h2 class="mt-2 text-2xl">JonJones</h2>
      <div class="flex justify-between items-baseline">
        <h4 class="text-sm">
          Number of referrals: <b class="text-lg text-blue-800">55</b>
        </h4>
        <h4 class="text-sm">
          Invite Code: <Copiable text="Jon2353" class="text-lg" />
        </h4>
      </div>
    </div>
  );
};

export default UserInfo;

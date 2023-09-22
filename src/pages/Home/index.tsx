import UserInfo from "../../components/UserInfo";
import UserList from "../../components/UserList";
import BaseLayout from "../../layouts/BaseLayout";

const HomePage = () => {
  return (
    <BaseLayout>
      <section class="mt-4">
        <UserInfo />
        <UserList />
      </section>
    </BaseLayout>
  );
};

export default HomePage;

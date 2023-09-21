import Copiable from "../../components/Copiable";
import Input from "../../components/Input";
import UserInfo from "../../components/UserInfo";
import BaseLayout from "../../layouts/BaseLayout";

const HomePage = () => {
  return (
    <BaseLayout>
      <section class="mt-4">
        <UserInfo />
        <form class="mt-4">
          <Input type="search" placeholder="Search username.." />
        </form>
      </section>
    </BaseLayout>
  );
};

export default HomePage;

import { ParentComponent } from "solid-js";
import PageHeader from "../../components/Header";

const BaseLayout: ParentComponent = (props) => {
  return (
    <main class="w-full max-w-lg mx-auto">
      <PageHeader />
      {props.children}
    </main>
  );
};

export default BaseLayout;

import { ParentComponent } from "solid-js";
import PageHeader from "../../components/Header";

const BaseLayout: ParentComponent = (props) => {
  return (
    <main class="w-full max-w-xl mx-auto p-4">
      <PageHeader />
      {props.children}
    </main>
  );
};

export default BaseLayout;

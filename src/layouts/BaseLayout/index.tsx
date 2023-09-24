import { ParentComponent, Suspense } from "solid-js";
import PageHeader from "../../components/Header";
import PageLoader from "../../components/PageLoader";

const BaseLayout: ParentComponent = (props) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <main class="w-full max-w-xl mx-auto p-4">
        <PageHeader />
        {props.children}
      </main>
    </Suspense>
  );
};

export default BaseLayout;

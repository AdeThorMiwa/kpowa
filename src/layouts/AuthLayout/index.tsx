import { ParentComponent } from "solid-js";
import Button from "../../components/Button";

type AuthLayoutProps = {
  title: string;
  onSubmit: (e: Event) => Promise<void>;
  loading: boolean;
};

const AuthLayout: ParentComponent<AuthLayoutProps> = (props) => {
  const loading = () => props.loading;

  return (
    <section class="container mx-auto w-screen flex justify-center items-center h-screen flex-col">
      <h1 class="text-2xl font-bold">
        Kill<span class="text-blue-800">powa</span> Server
      </h1>
      <h4 class="mt-2">{props.title}</h4>
      <form
        onSubmit={props.onSubmit}
        class="mt-5 w-full max-w-sm flex flex-col"
      >
        {props.children}
        <Button
          type="submit"
          text="Continue"
          class="self-end"
          loading={loading}
        />
      </form>
    </section>
  );
};

export default AuthLayout;

import { Component } from "solid-js";
import Loader from "../Loader";

const PageLoader: Component = () => {
  return (
    <section class="w-screen h-screen flex justify-center items-center">
      <div class="text-blue-800 scale-150">
        <Loader />
      </div>
    </section>
  );
};

export default PageLoader;

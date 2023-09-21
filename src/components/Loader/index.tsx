import { Component } from "solid-js";
import styles from "./loader.module.css";

const Loader: Component = () => {
  return (
    <span class="h-[10px] w-full relative block">
      <span class="sr-only">Loading...</span>
      <span class={styles.loader} />
    </span>
  );
};

export default Loader;

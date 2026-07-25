import Disclosure from "./Disclosure";
import Tabs from "./Tabs";
import Modal from "./Modal";

export default function Playground() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Accessible Components Playground</h1>

      <hr />

      <h2>1. Disclosure</h2>
      <Disclosure />

      <hr />

      <h2>2. Tabs</h2>
      <Tabs />

      <hr />

      <h2>3. Modal Dialog</h2>
      <Modal />
    </div>
  );
}
import Disclosure from "@/components/Disclosure/Disclosure";
import Modal from "@/components/Modal/Modal";
import Tabs from "@/components/Tabs/Tabs";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-10 space-y-10">
      <h1 className="text-4xl font-bold text-center">
        Accessible Component Playground
      </h1>

      <Disclosure />
      <Modal />
      <Tabs />
    </main>
  );
}
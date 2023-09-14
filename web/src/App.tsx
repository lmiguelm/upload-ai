import { Aside } from "./components/Aside";
import { Content } from "./components/Content";
import { Header } from "./components/Header";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 flex gap-6 max-sm:flex-col-reverse max-sm:items-center">
        <Content />
        <Aside />
      </main>
    </div>
  );
}

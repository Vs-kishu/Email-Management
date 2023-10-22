import React from "react";
import Header from "./components/Header";
import EmailLists from "./pages/EmailLists";

const App = () => {
  return (
    <main className="bg-black w-full max-h-screen overflow-auto">
      <section className="text-xl  w-5/6 bg-slate-50 mx-auto  p-10">
        <Header />
        <EmailLists />
      </section>
    </main>
  );
};

export default App;

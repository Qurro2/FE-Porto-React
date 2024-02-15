import React, { useEffect } from "react";
import Router from "./components/Router";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <main>
        <Router />
      </main>
    </>
  );
}

import React, { useEffect } from "react";
import Router from "./components/Router";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

export default function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Helmet>
        <title>Qurrota Ayun</title>
        <link rel="icon" href="/q.svg" type="image/svg+xml" />
      </Helmet>
      <main>
        <Router />
      </main>
    </>
  );
}

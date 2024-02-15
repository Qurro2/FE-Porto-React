import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Homepage from "../components/users/Home";
import Keterampilan from "../components/users/Keterampilan";
import Ulasan from "../components/users/Ulasan";
import Project from "../components/users/Project";
import Contactme from "../components/users/Contactme";
import Whatasappeffect from "../components/effectype/Whatasappeffect";

function Userpage() {
  return (
    <div>
      <Header />
      <Homepage />
      <Keterampilan />
      <Ulasan />
      <Project />
      <Contactme />
      <Whatasappeffect />
      <Footer />
    </div>
  );
}

export default Userpage;

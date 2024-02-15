import React from "react";
import Sidebar from "../components/common/Sidebar";
import Homedev from "../components/admin/Homedev";
import Footer from "../components/common/Footer";

function Adminpage() {
  return (
    <div>
      <Sidebar />
      <Homedev />
      <Footer />
    </div>
  );
}

export default Adminpage;

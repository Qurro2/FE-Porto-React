import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // tambahkan Navigate
import Cookies from "js-cookie";
import Userpage from "../pages/Userpage";
import Loginform from "./form/Loginform";
import Adminpage from "../pages/Adminpage";
import Profiledev from "./admin/Profiledev";
import Pengalamandev from "./admin/Pengalamandev";
import Keterampilandev from "./admin/Keterampilandev";
import Projectdev from "./admin/Projectdev";
import Errorpage from "./notfound/errorpage";
import Profileuser from "./form/Profileuser";
import Contactdev from "./admin/Contactdev";

const Router = () => {
  const token = Cookies.get("token"); // Membaca token dari cookies

  return (
    <Routes>
      {token ? (
        <>
          <Route path="/developer" element={<Adminpage />} />
          <Route path="/profileupdate" element={<Profiledev />} />
          <Route path="/pengalamanupdate" element={<Pengalamandev />} />
          <Route path="/keterampilanupdate" element={<Keterampilandev />} />
          <Route path="/projectupdate" element={<Projectdev />} />
          <Route path="*" element={<Navigate to="/developer" />} />
          <Route path="/profile/user" element={<Profileuser />} />
          <Route path="/contact" element={<Contactdev />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Userpage />} />
          <Route path="/portal" element={<Loginform />} />
          <Route path="*" element={<Errorpage />} />
        </>
      )}
    </Routes>
  );
};

export default Router;

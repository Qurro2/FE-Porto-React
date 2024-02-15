import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome, AiFillContacts, AiFillContainer } from "react-icons/ai";
import { GiSkills } from "react-icons/gi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";

const Sidebar = () => {
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-200 rounded-3xl mt-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/developer">
                  <AiFillHome />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profileupdate">
                  <AiFillContacts />
                  Profile Update
                </Link>
              </li>
              <li>
                <Link to="/keterampilanupdate">
                  <GiSkills />
                  Keterampilan Update
                </Link>
              </li>
              <li>
                <Link to="/pengalamanupdate">
                  <AiFillContainer />
                  Pengalaman Update
                </Link>
              </li>
              <li>
                <Link to="/projectupdate">
                  <AiFillContainer />
                  Project Update
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl" href="developer">
            QURROTA AYUN
          </a>
        </div>
        <div className="navbar-end">
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a
                    onClick={() => {
                      Swal.fire({
                        icon: "question",
                        title: "Apakah Anda Ingin Log Out?",
                        confirmButtonText: "Yes",
                        showCancelButton: true,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          const token = Cookies.get("token");
                          axios.delete("http://localhost:3000/dev/logout", {
                            headers: {
                              Authorization: `${token}`, // Sertakan token dalam header Authorization
                            },
                          });
                          Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Logout Berhasil",
                          }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                              Cookies.remove("token");
                              window.location.href = "/portal";
                            } else if (result.isDismissed) {
                              window.location.href = "/portal";
                            }
                          });
                        } else if (result.isDismissed) {
                          console.log("gakjadilogout");
                        }
                      });
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

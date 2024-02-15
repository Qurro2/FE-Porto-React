import React from "react";
import { Link } from "react-scroll";

const Header = () => {
  return (
    <div className="navbar bg-base-200 rounded-3xl mt-5 container mx-auto  sticky top-0 left-0 right-0 z-10 font-bold">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/" spy={false} smooth={true} offset={0} duration={500}>
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="keterampilan"
                spy={false}
                smooth={true}
                offset={0}
                duration={500}
              >
                Keterampilan
              </Link>
            </li>
            <li>
              <Link
                to="pengalaman"
                spy={false}
                smooth={true}
                offset={0}
                duration={500}
              >
                Pengalaman
              </Link>
            </li>
            <li>
              <Link
                to="project"
                spy={false}
                smooth={true}
                offset={0}
                duration={500}
              >
                Project
              </Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl" href="/">
          Qurrota Ayun
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" spy={false} smooth={true} offset={0} duration={500}>
              Beranda
            </Link>
          </li>
          <li>
            <Link
              to="keterampilan"
              spy={false}
              smooth={true}
              offset={0}
              duration={500}
            >
              Keterampilan
            </Link>
          </li>
          <li>
            <Link
              to="pengalaman"
              spy={false}
              smooth={true}
              offset={0}
              duration={500}
            >
              Pengalaman
            </Link>
          </li>
          <li>
            <Link
              to="project"
              spy={false}
              smooth={true}
              offset={0}
              duration={500}
            >
              Project
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-neutral rounded-3xl" href="/portal">
          Dev
        </a>
      </div>
    </div>
  );
};

export default Header;

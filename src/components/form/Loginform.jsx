import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Harap isi email dan password",
      });
      return;
    }
    try {
      const result = await axios.post(`http://localhost:3000/user/login`, {
        email: email,
        password: password,
      });
      console.log(result.data);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login berhasil",
          showConfirmButton: false,
          timer: 1500,
        });
        Cookies.set("token", result.data.data.token);
        setTimeout(() => {
          window.location.href = "/developer";
        }, "1000");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.errors,
      });
    }
  };
  return (
    <div className="container mx-auto min-h-screen flex items-center">
      <div className="hero bg-base-200 rounded-2xl skeleton">
        <div className="hero-content flex-col lg:flex-row-reverse justify-center items-center h-full w-full mt-3.5">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login Developer</h1>
            <p className="py-6">
              Login ini khusus untuk developer <br />
              Untuk masuk kedalam dashboard <br />
            </p>
            <a href="/" className="relative h-32 w-32">
              <button className="btn btn-active btn-neutral btn-sm mt-5  ">
                <FaHome size={24} />
              </button>
            </a>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={postLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginform;

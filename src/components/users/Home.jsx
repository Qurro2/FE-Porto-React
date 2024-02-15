import React, { useEffect, useState } from "react";
import TypingEffect from "../effectype/TypingEffect";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import axios from "axios";
import { Link } from "react-router-dom";

const Homepage = () => {
  const textToType = "Hi, Saya Qurrota Ayun";

  const handleDownloadClick = (event) => {
    // Mencegah perilaku bawaan dari tautan
    event.preventDefault();
    // Mendapatkan URL file CV
    const fileUrl = `http://localhost:3000/${home.cv}`;
    // Membuat elemen anchor
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    // Menentukan atribut download
    anchor.setAttribute("download", "CV.pdf");
    // Membuka tautan di tab atau jendela baru
    anchor.setAttribute("target", "_blank");
    // Menambahkan elemen anchor ke dalam dokumen
    document.body.appendChild(anchor);
    // Mengklik tautan secara otomatis
    anchor.click();
    // Menghapus elemen anchor dari dokumen setelah file selesai di-download
    anchor.remove();
  };
  const [home, setHome] = useState([]);

  const getHome = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/profile");
      console.log(response.data.data);
      setHome(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getHome();
  }, []);
  return (
    <section id="/">
      <div className="container mx-auto mt-5 flex justify-center">
        <div className="hero min-h-screen bg-base-200 rounded-2xl border-4 border-indigo-500/100 p-6">
          <div className="hero-content flex-col lg:flex-row h-auto w-full bg-base-300 rounded-2xl skeleton">
            <img
              src={`http://localhost:3000/${home.photo}`}
              className="max-w-sm rounded-lg shadow-2xl mb-6 lg:mb-0"
              alt="Profile"
              style={{ maxWidth: "80%", height: "auto" }}
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mt-5">
                <TypingEffect text={home.nama} speed={250} />
              </h1>
              <h5 className="mt-4" id="role">
                {home.divisi}
              </h5>
              <p className="py-4">{home.tentang}</p>
              <a
                className="btn btn-primary"
                href={`http://localhost:3000/${home.cv}`}
                onClick={handleDownloadClick}
                download
              >
                Download CV
              </a>
              <div className="grid grid-flow-col gap-5 auto-cols-max mt-5">
                <a
                  href="https://github.com/your-github-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn hover:bg-neutral-500"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://instagram.com/your-instagram-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn hover:bg-red-700"
                >
                  <RiInstagramFill size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/your-linkedin-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn hover:bg-blue-700"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;

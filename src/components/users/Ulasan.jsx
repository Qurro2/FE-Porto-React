import React, { useState, useEffect } from "react";
import axios from "axios";

const Ulasan = () => {
  const [pengalaman, setPengalaman] = useState([]);

  // Mengambil data dari database menggunakan axios
  useEffect(() => {
    const getPengalaman = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/pengalaman"
        );
        setPengalaman(response.data.data);
      } catch (error) {
        console.error("Tidak mendapatkan data pengalaman", error);
      }
    };

    getPengalaman();
  }, []);

  // Fungsi untuk menentukan posisi timeline
  const getTimelinePosition = (index) => {
    return index % 2 === 0 ? "start" : "end";
  };

  return (
    <section id="pengalaman">
      <div className="container mx-auto">
        <div className="card mt-16 bg-base-200 animate-pulse border-4 border-indigo-500/100">
          <h1 className="text-5xl font-bold text-center mt-10">Pengalaman</h1>
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical mt-10">
            {pengalaman.map((pengalamanItem, index) => (
              <li key={pengalamanItem.id}>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  className={`timeline-${getTimelinePosition(
                    index
                  )} md:text-end mb-10`}
                >
                  <time className="font-mono italic">
                    {pengalamanItem.tahun}
                  </time>
                  <div className="text-lg font-black">
                    {pengalamanItem.nama}
                  </div>
                  <p>{pengalamanItem.bagian}</p>
                  <p>{pengalamanItem.ulasan}</p>
                </div>
                {index !== pengalaman.length - 1 && <hr />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Ulasan;

import React from "react";
import "./Errorcss.css";

const Errorpage = () => {
  return (
    <div>
      <div className="error-container">
        <div className="error-content">
          <h1 className="error-heading">Oops! Halaman Tidak Ditemukan</h1>
          <p className="error-text">
            Maaf, halaman yang Anda cari tidak ditemukan. Silakan periksa URL
            atau kembali ke halaman utama.
          </p>
          <button
            className="error-button"
            onClick={() => (window.location.href = "/")}
          >
            Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    </div>
  );
};

export default Errorpage;

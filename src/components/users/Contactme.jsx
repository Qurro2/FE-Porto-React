import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Import ikon email dan lokasi

const Contactme = () => {
  const [dataForm, setDataForm] = useState({
    nama: "",
    email: "",
    number: "",
    ulasan: "",
  });

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Periksa jika setiap field dalam form kosong
    if (
      dataForm.nama.trim() === "" ||
      dataForm.email.trim() === "" ||
      dataForm.number.trim() === "" ||
      dataForm.ulasan.trim() === ""
    ) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Isi semua form contact",
        showConfirmButton: false,
        timer: 1500,
      });
      return; // Jangan melanjutkan pengiriman jika ada field yang kosong
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/contact",
        dataForm
      );
      console.log("Response:", response.data);
      // Clear form after successful submission
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil kirim form contact",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);

        // Setel kembali nilai-nilai formData setelah berhasil
        setDataForm({
          nama: "",
          email: "",
          number: "",
          ulasan: "",
        });
        // Ambil data baru setelah membuat atau mengupdate data
      }
    } catch (error) {
      console.error("Gagal submit form contact", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="card items-center mt-10 bg-base-200">
        <h1 className="text-5xl font-bold mt-10">Kontak Saya</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 p-2">
          <div className="grid items-center lg:items-start md:items-start p-5">
            <div>
              <FaEnvelope className="text-blue-500 text-xl mr-2" />
              <p className="mb-2">kuriayun@gmail.com</p>
              {/* Menambahkan margin bawah */}
              <FaMapMarkerAlt className="text-red-500 text-xl mr-2" />
              <p>Tebet Timur, Jakarta Selatan</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="md:ml-5">
            <div className="grid lg:grid-flow-col lg:gap-4 md:gap-3 sm:gap-1 lg:w-full">
              <input
                type="text"
                name="nama"
                value={dataForm.nama}
                onChange={handleChange}
                placeholder="Nama"
                className="input input-bordered w-full max-w-xs mb-3 md:mb-0"
              />
              <input
                type="email"
                name="email"
                value={dataForm.email}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered w-full max-w-xs mb-3 md:mb-0"
              />
              <input
                type="text"
                name="number"
                value={dataForm.number}
                onChange={handleChange}
                placeholder="Phone"
                className="input input-bordered w-full max-w-xs mb-3 md:mb-0"
              />
              <textarea
                name="ulasan"
                value={dataForm.ulasan}
                onChange={handleChange}
                className="textarea textarea-bordered row-span-3 textarea-lg w-full max-w-xs mb-3 md:mb-0"
                placeholder="Ulasan"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success mt-5 w-15">
              Kirim
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactme;

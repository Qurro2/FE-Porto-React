import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {
  FaTrashAlt,
  FaEdit,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Sidebar from "../common/Sidebar";
import Footer from "../common/Footer";

const Profiledev = () => {
  const token = Cookies.get("token");

  const [formData, setFormData] = useState({
    nama: "",
    divisi: "",
    tentang: "",
    photo: null,
    cv: null,
  });

  const [editing, setEditing] = useState(false);
  const [editedId, setEditedId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.divisi || !formData.tentang) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Harap isi semua bidang",
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nama", formData.nama);
      formDataToSend.append("divisi", formData.divisi);
      formDataToSend.append("tentang", formData.tentang);
      formDataToSend.append("photo", formData.photo);
      formDataToSend.append("cv", formData.cv);

      let response;
      if (editing) {
        response = await axios.patch(
          `http://localhost:3000/dev/profile/update/${editedId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/dev/profile/create",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token}`,
            },
          }
        );
      }

      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil membuat data",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      }

      setFormData({
        nama: "",
        divisi: "",
        tentang: "",
        photo: null,
        cv: null,
      });

      setEditing(false);
      setEditedId(null);
    } catch (error) {
      console.error("Gagal membuat/mengedit data:", error);
    }
  };

  const [dataProfile, setDataProfile] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dev/profile", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setDataProfile(response.data.data);
      setTotalPages(Math.ceil(response.data.data.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dev/profile/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setFormData({
        nama: response.data.nama || "",
        divisi: response.data.divisi || "",
        tentang: response.data.tentang || "",
        photo: null,
        cv: null,
      });

      setEditing(true);
      setEditedId(id);

      document.getElementById("my_modal_6").click();
    } catch (error) {
      console.error("Error fetching data for editing:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const responseDelete = await axios.delete(
        `http://localhost:3000/dev/profile/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (responseDelete.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil membuat data",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchData(); // Refresh data after deletion
      }
    } catch (error) {
      console.error("error deleting data profile", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataProfile.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Sidebar />
      <div className="container mx-auto">
        <div className="card min-h-screen bg-base-200 mt-10 ">
          <h1 className="flex text-justify justify-center mt-24 text-2xl font-bold">
            TABLE PROFILE
          </h1>
          <label
            htmlFor="my_modal_6"
            className="btn btn-primary mt-20 w-28 ml-5"
          >
            Tambah Profile
          </label>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />

          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="font-bold text-lg">PROFILE</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-rows-5 grid-flow-col gap-4 mt-5">
                  <input
                    type="text"
                    name="nama"
                    placeholder="nama"
                    className="input input-bordered"
                    value={formData.nama}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="divisi"
                    placeholder="divisi"
                    className="input input-bordered"
                    value={formData.divisi}
                    onChange={handleChange}
                  />
                  <input
                    type="file"
                    name="photo"
                    className="file-input file-input-bordered"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <input
                    type="file"
                    name="cv"
                    className="file-input file-input-bordered"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <textarea
                    name="tentang"
                    className="textarea textarea-bordered row-span-3"
                    placeholder="tentang"
                    maxLength="1500"
                    value={formData.tentang}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="modal-action mt-4">
                  <button type="submit" className="btn btn-success">
                    Simpan
                  </button>
                  <label htmlFor="my_modal_6" className="btn btn-error">
                    Batal
                  </label>
                </div>
              </form>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table mt-16">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th style={{ maxWidth: "80px" }}>id</th>
                  <th style={{ maxWidth: "100px" }}>photo</th>
                  <th style={{ maxWidth: "150px" }}>nama</th>
                  <th style={{ maxWidth: "150px" }}>divisi</th>
                  <th style={{ maxWidth: "700px" }}>tentang</th>
                  <th style={{ maxWidth: "100px" }}>cv</th>
                  <th style={{ maxWidth: "100px" }}>action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((profile, index) => (
                    <tr key={index}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>{profile.id}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={`http://localhost:3000/${profile.photo}`}
                                alt="Avatar"
                                style={{ maxWidth: "50px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ maxWidth: "150px" }}>{profile.nama}</td>
                      <td style={{ maxWidth: "150px" }}>{profile.divisi}</td>
                      <td style={{ maxWidth: "500px" }}>{profile.tentang}</td>
                      <td style={{ maxWidth: "100px" }}>{profile.cv}</td>
                      <th style={{ maxWidth: "100px" }} className="flex gap-2">
                        <button
                          className="btn btn-error"
                          onClick={() => handleDelete(profile.id)}
                        >
                          <FaTrashAlt />
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEdit(profile.id)}
                        >
                          <FaEdit />
                        </button>
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination text-end">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn"
            >
              <FaChevronLeft />
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="btn"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profiledev;

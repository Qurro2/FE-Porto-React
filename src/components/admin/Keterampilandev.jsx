import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import Footer from "../common/Footer";
import {
  FaTrashAlt,
  FaEdit,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";

const Keterampilandev = () => {
  const token = Cookies.get("token");

  const [formData, setFormData] = useState({
    nama: "",
    logo: null,
  });
  const [dataSkill, setDataSkill] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Menghandle perubahan pada input teks
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Menghandle perubahan pada input berkas
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Mengirim data keterampilan baru ke server
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.logo) {
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
      formDataToSend.append("logo", formData.logo);

      let response;
      if (editMode) {
        response = await axios.patch(
          `http://localhost:3000/dev/skill/update/${editedId}`,
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
          "http://localhost:3000/dev/skill/create",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token}`,
            },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: editMode ? "Berhasil update data" : "Berhasil membuat data",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
        setEditMode(false);
        setEditedId(null);
        getDataDashboard();
      }
    } catch (error) {
      console.error("Gagal membuat data skill", error);
    }
  };

  const getDataDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dev/skill/", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setDataSkill(response.data.data);
    } catch (error) {
      console.error("Gagal mendapatkan data skill", error);
    }
  };

  useEffect(() => {
    getDataDashboard();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dev/skill/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setFormData({
        nama: response.data.nama || "",
        logo: response.data.logo,
      });
      setEditMode(true);
      setEditedId(id);
      document.getElementById("my_modal_6").click();
    } catch (error) {
      console.error("Gagal update data keterampilan", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const responseDelete = await axios.delete(
            `http://localhost:3000/dev/skill/${id}`,
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
              title: "Berhasil menghapus data",
              showConfirmButton: false,
              timer: 1500,
            });
            getDataDashboard(); // Refresh data after deletion
          }
        } catch (error) {
          console.error("Gagal menghapus data skill", error);
        }
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = dataSkill.filter((item) => {
    return item.nama.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalFilteredItems = filteredData.length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Sidebar />
      <div className="container mx-auto">
        <div className="card min-h-screen bg-base-200 mt-10 ">
          <h1 className="flex text-justify justify-center mt-24 text-2xl font-bold">
            TABLE KETERAMPILAN
          </h1>
          <label
            htmlFor="my_modal_6"
            className="btn btn-primary mt-20 w-28 ml-5"
          >
            Tambah Keterampilan
          </label>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />

          {/* Modal untuk input data keterampilan */}
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="font-bold text-lg">KETERAMPILAN</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-rows-4 grid-flow-col gap-4 mt-5">
                  <input
                    type="text"
                    placeholder="Nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <input
                    type="file"
                    name="logo"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="modal-action">
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

          {/* Input pencarian */}
          <div className="flex justify-end p-4">
            <input
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={handleSearch}
              className="input input-bordered max-w-xs"
            />
          </div>

          {/* Tabel untuk menampilkan data keterampilan */}
          <div className="overflow-x-auto">
            <table className="table mt-8">
              {/* Header tabel */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>ID</th>
                  <th>Logo</th>
                  <th>Nama</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Data keterampilan dengan pagination */}
                {currentItems.length > 0 ? (
                  currentItems.map((skill, index) => (
                    <tr key={index}>
                      <td>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td>{skill.id}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={`http://localhost:3000/${skill.logo}`}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{skill.nama}</td>
                      <td className="flex gap-2">
                        <button
                          className="btn btn-error"
                          onClick={() => handleDelete(skill.id)}
                        >
                          <FaTrashAlt />
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEdit(skill.id)}
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination text-center my-5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn"
            >
              <FaChevronLeft />
            </button>
            <button className="btn">{`Page ${currentPage}`}</button>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev === totalPages ? prev : prev + 1
                )
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

export default Keterampilandev;

import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import Footer from "../common/Footer";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const Pengalamandev = () => {
  const token = Cookies.get("token");

  const [inputData, setInputData] = useState({
    nama: "",
    bagian: "",
    tahun: "",
    ulasan: "",
  });

  const [dataPengalaman, setDataPengalaman] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputData.nama ||
      !inputData.bagian ||
      !inputData.tahun ||
      !inputData.ulasan
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Harap isi semua bidang",
      });
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nama", inputData.nama);
      formDataToSend.append("bagian", inputData.bagian);
      formDataToSend.append("tahun", inputData.tahun);
      formDataToSend.append("ulasan", inputData.ulasan);

      let response;
      if (edit) {
        response = await axios.patch(
          `http://localhost:3000/dev/pengalaman/update/${editedId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/dev/pengalaman/create",
          inputData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
      }
      if (response.status === 200) {
        // Update UI or perform other actions as needed
        Swal.fire({
          position: "center",
          icon: "success",
          title: edit ? "Berhasil mengupdate data" : "Berhasil membuat data",
          showConfirmButton: false,
          timer: 1500,
        });
        getDataDashboard();
        setInputData({
          nama: "",
          bagian: "",
          tahun: "",
          ulasan: "",
        });
        setEdit(false);
        setEditedId(null);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Gagal Mengirim Data", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const editResponse = await axios.get(
        `http://localhost:3000/dev/pengalaman/current/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setInputData({
        nama: editResponse.data.nama || "",
        bagian: editResponse.data.bagian || "",
        tahun: editResponse.data.tahun || "",
        ulasan: editResponse.data.ulasan || "",
      });
      setEdit(true);
      setEditedId(id);
      document.getElementById("my_modal_6").click();
    } catch (error) {
      console.error("Gagal mengedit data pengalaman", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, hapus!",
    });

    if (confirmed.isConfirmed) {
      try {
        const responseDelete = await axios.delete(
          `http://localhost:3000/dev/pengalaman/${id}`,
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
            timer: 5000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        console.error("Gagal menghapus data skill", error);
      }
    }
  };

  const getDataDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dev/pengalaman", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setDataPengalaman(response.data.data);
    } catch (error) {
      console.error("Gagal mendapatkan data pengalaman", error);
    }
  };
  useEffect(() => {
    getDataDashboard();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  const filteredData = dataPengalaman.filter((item) => {
    return (
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bagian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tahun.toString().includes(searchTerm) ||
      item.ulasan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalFilteredItems = filteredData.length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

  const renderPagination = () => {
    const pageButtons = [];
    if (totalPages > 1) {
      pageButtons.push(
        <button
          key="prev"
          onClick={() => setCurrentPage(currentPage - 1)}
          className="join-item btn"
          disabled={currentPage === 1}
        >
          «
        </button>
      );

      pageButtons.push(
        <button
          key={currentPage}
          onClick={() => setCurrentPage(currentPage)}
          className="join-item btn"
        >
          Page {currentPage}
        </button>
      );

      pageButtons.push(
        <button
          key="next"
          onClick={() => setCurrentPage(currentPage + 1)}
          className="join-item btn"
          disabled={currentPage === totalPages}
        >
          »
        </button>
      );
    }
    return pageButtons;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Sidebar />
      <div className="container mx-auto">
        <div className="card min-h-screen bg-base-200 mt-10 ">
          <h1 className="flex text-justify justify-center mt-24 text-2xl font-bold">
            TABLE PENGALAMAN
          </h1>

          {/* Modal */}
          <label
            htmlFor="my_modal_6"
            className="btn btn-primary mt-20 w-28 ml-5"
          >
            Tambah Pengalaman
          </label>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="font-bold text-lg">PENGALAMAN</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-rows-4 grid-flow-col gap-4 mt-5">
                  <input
                    type="text"
                    placeholder="Nama"
                    name="nama"
                    value={inputData.nama}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="Bagian"
                    name="bagian"
                    value={inputData.bagian}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <input
                    type="number"
                    placeholder="Tahun"
                    name="tahun"
                    value={inputData.tahun}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <textarea
                    className="textarea textarea-bordered row-span-3"
                    placeholder="Ulasan"
                    name="ulasan"
                    value={inputData.ulasan}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn btn-error">
                    Batal
                  </label>
                  <button className="btn btn-success">Simpan</button>
                </div>
              </form>
            </div>
          </div>

          {/* Search input */}
          <div className="p-4 flex justify-end">
            <input
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={handleSearch}
              className="input input-bordered max-w-xs"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table mt-4">
              {/* Table head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>id</th>
                  <th>nama</th>
                  <th>bagian</th>
                  <th>tahun</th>
                  <th>ulasan</th>
                  <th>action</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </td>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td>{item.bagian}</td>
                    <td>{item.tahun}</td>
                    <td>
                      {item.ulasan}
                      <br />
                    </td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-error"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrashAlt />
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(item.id)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center p-4">
            <div className="join">{renderPagination()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pengalamandev;

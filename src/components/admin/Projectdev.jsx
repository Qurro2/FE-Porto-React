import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import Footer from "../common/Footer";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const Projectdev = () => {
  const token = Cookies.get("token");

  const [formData, setFormData] = useState({
    photo: null,
    nama: "",
    role: "",
    ulasan: "",
    link: "", // Ubah menjadi string kosong agar tidak null
  });

  const [dataProject, setDataProject] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [serchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  {
    /* start - kode untuk input*/
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };
  {
    /* end - kode untuk input*/
  }

  {
    /* start - kode untuk fitur search dan pagination*/
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = dataProject.filter((item) => {
    return (
      item.nama.toLowerCase().includes(serchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(serchTerm.toLowerCase()) ||
      item.ulasan.toLowerCase().includes(serchTerm.toLocaleLowerCase())
    );
  });

  const totalFilteredItems = filteredData.length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
  {
    /* end - kode untuk fitur search dan pagination*/
  }

  {
    /* start - kode untuk submit data  */
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.link) {
        formData.link = "";
      }
      const formDataToSend = new FormData();
      formDataToSend.append("photo", formData.photo);
      formDataToSend.append("nama", formData.nama);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("ulasan", formData.ulasan);
      formDataToSend.append("link", formData.link);

      let response;

      if (editMode) {
        response = await axios.patch(
          `http://localhost:3000/dev/project/update/${editedId}`,
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
          "http://localhost:3000/dev/project/create",
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

        // Setel kembali nilai-nilai formData setelah berhasil
        setFormData({
          photo: null,
          nama: "",
          role: "",
          ulasan: "",
          link: "",
        });
        setEditMode(false);
        setEditedId(null);

        // Ambil data baru setelah membuat atau mengupdate data
        getDataDashboard();
      }
    } catch (error) {
      console.error("Gagal kirim data project", error);
    }
  };
  {
    /* start - kode untuk submit data  */
  }

  {
    /* start - kode edit data*/
  }
  const handleEdit = async (id) => {
    try {
      const responseProjectEdit = await axios.get(
        `http://localhost:3000/dev/project/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setFormData({
        photo: responseProjectEdit.data.photo,
        nama: responseProjectEdit.data.nama || "",
        role: responseProjectEdit.data.role || "",
        ulasan: responseProjectEdit.data.ulasan || "",
        link: responseProjectEdit.data.link || "",
      });
      setEditMode(true);
      setEditedId(id);
      document.getElementById("my_modal_6").click();
    } catch (error) {
      console.error("Gagal mengupdate data project", error);
    }
  };
  {
    /* end - kode edit data*/
  }

  {
    /* start - kode hapus data*/
  }
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
          const responseDeleteProject = await axios.delete(
            `http://localhost:3000/dev/project/${id}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          if (responseDeleteProject.status === 200) {
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
          console.error("Gagal menhapus data project", error);
        }
      }
    });
  };
  {
    /* end - kode hapus data*/
  }

  {
    /* start - kode untuk mendapatkan data*/
  }
  const getDataDashboard = async () => {
    try {
      const projectResponse = await axios.get(
        "http://localhost:3000/dev/project",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setDataProject(projectResponse.data.data);
    } catch (error) {
      console.error("Gagal mendapatkan data project", error);
    }
  };

  useEffect(() => {
    getDataDashboard();
  }, []);
  {
    /* end - kode untuk mendapatkan data*/
  }
  return (
    <>
      <Sidebar />
      <div className="container mx-auto">
        <div className="card min-h-screen bg-base-200 mt-10 ">
          <h1 className="flex text-justify justify-center mt-24 text-2xl font-bold">
            TABLE PROJECT
          </h1>
          <label
            htmlFor="my_modal_6"
            className="btn btn-primary mt-20 w-28 ml-5"
          >
            Tambah Project
          </label>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />

          {/* code input dalam modal */}
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="font-bold text-lg">PROJECT</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-rows-5 grid-flow-col gap-4 mt-5">
                  <input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="nama project"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                  />

                  <textarea
                    className="textarea textarea-bordered row-span-3"
                    placeholder="ulasan"
                    name="ulasan"
                    value={formData.ulasan}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn btn-error">
                    Batal
                  </label>
                  <button className="btn btn-success" type="submit">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* code search */}
          <div className="flex justify-end p-4">
            <input
              type="text"
              placeholder="Cari..."
              value={serchTerm}
              onChange={handleSearch}
              className="input input-bordered max-w-xs"
            />
          </div>

          {/* code table*/}
          <div className="overflow-x-auto">
            <table className="table mt-16">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>id</th>
                  <th>photo</th>
                  <th>nama project</th>
                  <th>role</th>
                  <th>ulasan</th>
                  <th>link</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {currentItems.map((project, index) => (
                  <tr key={index}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>{project.id}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={`http://localhost:3000/${project.photo}`}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{project.nama}</td>
                    <td>{project.role}</td>
                    <td>{project.ulasan}</td>
                    <td>{project.link}</td>
                    <th className="flex gap-2">
                      <button
                        className="btn btn-error"
                        onClick={() => handleDelete(project.id)}
                      >
                        <FaTrashAlt />
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(project.id)}
                      >
                        <FaEdit />
                      </button>
                    </th>
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

export default Projectdev;

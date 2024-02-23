import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import Cookies from "js-cookie";
import axios from "axios";
import {
  FaTrashAlt,
  FaEdit,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Contactdev = () => {
  const token = Cookies.get("token");
  const [dataContact, setDataContact] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    getDataDashboard();
  }, []); // Empty dependency array to run effect only once

  const getDataDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dev/contact", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setDataContact(response.data.data);
      setFilteredData(response.data.data); // Initialize filteredData with all data
    } catch (error) {
      console.error("Gagal mendapatkan data contact", error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filtered = dataContact.filter((contact) =>
      contact.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = async (id) => {
    try {
      const responseDelete = await axios.delete(
        `http://localhost:3000/dev/contact/${id}`,
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
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        getDataDashboard();
      }
    } catch (error) {
      console.error("Gagal menghapus data contact", error);
    }
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <Sidebar />
      <div className="container mx-auto">
        <div className="card min-h-screen bg-base-200 mt-10 ">
          <h1 className="flex text-justify justify-center mt-24 text-2xl font-bold">
            TABLE CONTACT
          </h1>
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
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Number</th>
                  <th>Ulasan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Data keterampilan dengan pagination */}
                {currentItems.length > 0 ? (
                  currentItems.map((contact, index) => (
                    <tr key={index}>
                      <td>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td>{contact.id}</td>
                      <td>{contact.nama}</td>
                      <td>{contact.email}</td>
                      <td>{contact.number}</td>
                      <td>{contact.ulasan}</td>
                      <td className="flex gap-2">
                        <button
                          className="btn btn-error"
                          onClick={() => handleDelete(contact.id)}
                        >
                          <FaTrashAlt />
                        </button>
                        {/* <button
                          className="btn btn-warning"
                          onClick={() => handleEdit(contact.id)}
                        >
                          <FaEdit />
                        </button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">Tidak ada data</td>
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
    </>
  );
};

export default Contactdev;

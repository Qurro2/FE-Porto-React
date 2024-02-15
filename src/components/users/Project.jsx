import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import Swal from "sweetalert2";

const Project = () => {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/project");
      setProjects(response.data.data);
    } catch (error) {
      console.error("Tidak mendapatkan data project", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleClick = (index) => {
    const element = document.querySelector(`#item${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGithubClick = (link) => {
    if (!link) {
      Swal.fire({
        icon: "error",
        title: "Maaf",
        text: "Developer memprivasi kode ini ",
      });
    } else {
      // Mengecek apakah link sudah dimulai dengan protokol
      if (!link.startsWith("http://") && !link.startsWith("https://")) {
        link = "https://" + link;
      }
      window.open(link, "_blank");
    }
  };

  return (
    <section id="project">
      <div className="card container mx-auto items-center mt-10">
        <h1 className="text-5xl font-bold text-center">Project</h1>
        <div className="carousel min-w-80 max-w-80 rounded-md mt-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={`item${index}`}
              className="carousel-item w-full"
            >
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src={`http://localhost:3000/${project.photo}`}
                    alt="Shoes"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{project.nama}</h2>
                  <p>{project.role}</p>
                  <div className="card-actions">
                    <label htmlFor={`my_modal_${project.id}`} className="btn">
                      See Fitur
                    </label>
                    <div className="card-actions">
                      <button
                        className="btn btn-outline btn-primary"
                        onClick={() => handleGithubClick(project.link)}
                      >
                        <FaGithub size={24} />
                      </button>
                    </div>
                    <input
                      type="checkbox"
                      id={`my_modal_${project.id}`}
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <h3 className="text-lg font-bold">{project.nama}</h3>
                        <p className="py-4">{project.ulasan}</p>
                      </div>
                      <label
                        className="modal-backdrop"
                        htmlFor={`my_modal_${project.id}`}
                      >
                        Close
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={`#item${index}`}
              className="btn btn-xs"
              onClick={(e) => {
                e.preventDefault();
                handleClick(index);
              }}
            >
              {index + 1}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;

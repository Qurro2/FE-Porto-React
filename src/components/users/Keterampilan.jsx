import axios from "axios";
import React, { useEffect, useState } from "react";

const Keterampilan = () => {
  const [skill, setSkill] = useState([]);

  const getSkill = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/skill");
      setSkill(response.data.data);
    } catch (error) {
      console.error("Tidak mendapatkan data skill", error);
    }
  };

  useEffect(() => {
    getSkill();
  }, []);

  return (
    <section id="keterampilan">
      <div className="card container mx-auto mt-10 text-center">
        <h1 className="text-5xl font-bold">Keterampilan</h1>
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 justify-center mt-10 sm:gap-10 p-2">
          {skill.map((skillItem, index) => (
            <div
              key={index + 1}
              className="flex flex-col items-center md:mx-4 lg:mx-8"
            >
              <div className="rounded-xl overflow-hidden w-24 h-24 flex justify-center items-center relative">
                <img
                  src={`http://localhost:3000/${skillItem.logo}`}
                  alt={skillItem.nama}
                  className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-110"
                  style={{ maxWidth: "80%", height: "auto" }}
                />
              </div>
              <p className="font-semibold" style={{ maxWidth: "100px" }}>
                {skillItem.nama}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Keterampilan;

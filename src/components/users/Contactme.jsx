import React from "react";

const Contactme = () => {
  return (
    <div className="container mx-auto">
      <div className="card justify-center items-center mt-10 bg-base-200">
        <h1 className="text-5xl font-bold mt-10">Kontak Saya</h1>
        <div className="grid grid-rows-4 grid-flow-col gap-4 mt-5 p-2">
          <input
            type="text"
            placeholder="Nama"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="number"
            placeholder="phone"
            className="input input-bordered w-full max-w-xs"
          />

          <textarea
            className="textarea textarea-bordered row-span-3 textarea-lg w-full max-w-xs"
            placeholder="Ulasan"
          ></textarea>

          <button className="btn btn-success w-14">Kirim</button>
        </div>
      </div>
    </div>
  );
};

export default Contactme;

import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";

const Whatasappeffect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whatsappText, setWhatsappText] = useState("WhatsApp");

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 5000); // Tutup animasi setelah 5 detik

      // Ganti teks WhatsApp setiap 5 detik
      setTimeout(() => {
        setWhatsappText((prevText) => {
          if (prevText === "WhatsApp") {
            return "Yakin gak mau ke WhatsApp?";
          } else if (prevText === "Yakin gak mau ke WhatsApp?") {
            return "Rugi dong";
          } else {
            return "WhatsApp"; // Kembali ke teks awal setelah sekian lama
          }
        });
      }, 5000);
    }, 8000); // Mulai ulang setiap 8 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <a href="//wa.me/6281315024442" target="_blank">
      {isOpen && (
        <div className="chat chat-end fixed bottom-4 right-4 text-white rounded-full p-2 animate-open">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="../images/wa.png"
                width={8}
                height={8}
              />
            </div>
          </div>
          <div className="chat-header">Developer</div>
          <div className="chat-bubble">{whatsappText}</div>
          <div className="chat-footer opacity-50">Now</div>
        </div>
      )}
    </a>
  );
};

export default Whatasappeffect;

import React from "react";
import TypingEffect from "../effectype/TypingEffect";

const Homedev = () => {
  const textToDev = "Welcome Dev, Semoga hari mu menyenangkan";

  return (
    <div className="container mx-auto h-screen flex items-center">
      <div className="hero min-h-48 bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              <TypingEffect text={textToDev} />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homedev;

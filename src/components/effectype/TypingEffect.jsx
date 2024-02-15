import React, { useState, useEffect } from "react";

const TypingEffect = ({ text, speed = 250 }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted

    const typeText = async () => {
      // Check if text exists and has length before proceeding
      if (text && text.length) {
        for (let i = 0; i < text.length; i++) {
          if (!isMounted) return; // Check if the component is still mounted
          setDisplayText((prevText) => prevText + text[i]);
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
      }
    };

    typeText();

    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
      setDisplayText(""); // Clear the text when the component unmounts
    };
  }, [text, speed]);

  return <span>{displayText}</span>;
};

export default TypingEffect;

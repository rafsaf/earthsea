import React, { useState, useEffect } from "react";
import Placeholder from "../img/placeholder.png";

const ImageLoad = ({ src, className, href }) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(Placeholder);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;
    if (!imageToLoad.complete) {
      imageToLoad.onload = () => {
        setLoading(false);
        setCurrentSrc(src);
      };
    } else {
      setLoading(false);
      setCurrentSrc(src);
    }
  }, [src]);

  return (
    <a href={href}>
    <img
      style={{ opacity: loading ? 0.2 : 1, transition: "opacity .15s linear" }}
      className={className}
      src={currentSrc}
      alt="Not found"
    />
    </a>
  );
};

export default ImageLoad;

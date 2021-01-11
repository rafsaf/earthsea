import React, { useState, useEffect, useMemo } from "react";

const placeholderImageSrc =
  "https://vignette.wikia.nocookie.net/arda/images/5/5a/Earthsea.jpg/revision/latest/top-crop/width/360/height/450?cb=20200125094031&path-prefix=pl";

const ImageLoad = ({src, className}) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholderImageSrc);

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
    <img
      style={{ opacity: loading ? 0.2 : 1, transition: "opacity .15s linear" }}
      className={className}
      src={currentSrc}
      alt="Picture"
    />
  );
};

export default ImageLoad;

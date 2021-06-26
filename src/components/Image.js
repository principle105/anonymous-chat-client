import React, { useState, useEffect } from "react";

const Image = (props) => {

  const [imgSrc, setImageSrc] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = function() {
      setImageSrc(reader.result);
    }
  }, [props.blob])

  return (
    <img src={imgSrc} alt={props.fileName} style={{maxWidth:"100%", maxHeight:"100%"}}/>
  )
}

export default Image;

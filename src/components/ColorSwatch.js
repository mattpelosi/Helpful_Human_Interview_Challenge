import React from "react";

function ColorSwatch(props) {
  return (
    <div
      className="swatch-container"
      onClick={() => {
        props.detailView(props.text);
      }}
    >
      <div className="color-swatch" style={{ background: props.background }} />
      <p className="color-label">{props.text}</p>
    </div>
  );
}

export default ColorSwatch;

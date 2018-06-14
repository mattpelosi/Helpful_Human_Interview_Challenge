import React from "react";

function ColorSwatch(props) {
  return (
    <div
      className={`swatch-container${props.isSelected ? " selected" : ""}`}
      onClick={() => {
        props.detailView(props.colorData.hexCode);
      }}
    >
      <div
        className="color-swatch"
        style={{ background: props.colorData.hexCode }}
      />
      <div className="color-data">
        <p className="color-label">{props.colorData.hexCode}</p>
        {props.showLightness && (
          <p className="color-lightness">{props.colorData.lightness}</p>
        )}
      </div>
    </div>
  );
}

export default ColorSwatch;

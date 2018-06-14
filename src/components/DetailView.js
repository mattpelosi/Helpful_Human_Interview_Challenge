import React from "react";
import ColorSwatch from "./ColorSwatch";

function DetailView(props) {
  return (
    <div className="detail-view">
      <div className="detail-focus">
        <div
          className="detail-color"
          style={{ background: props.detailColor }}
        />
        <p className="detail-color-label">{props.detailColor}</p>
      </div>
      <div className="detail-color-options">
        {props.detailList.map((color, index) => (
          <ColorSwatch
            key={index}
            colorData={color}
            showLightness={true}
            detailView={props.detailView}
            isSelected={color.hexCode === props.detailColor ? true : false}
          />
        ))}
      </div>
      <button className="clear-color-button" onClick={props.clearDetailView}>
        Clear
      </button>
    </div>
  );
}

export default DetailView;

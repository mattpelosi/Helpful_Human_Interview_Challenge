import React from "react";
import ColorSwatch from "./ColorSwatch";

class DetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // debugger;
    return (
      <div className="detail-view">
        <div className="detail-focus">
          <div
            className="detail-color"
            style={{ background: this.props.detailColor }}
          />
          <p className="detail-color-label">{this.props.detailColor}</p>
        </div>
        <div className="detail-color-options">
          {this.props.detailList.map((color, index) => (
            <ColorSwatch
              key={index}
              text={color.hexCode}
              background={color.hexCode}
              DetailView={this.props.detailView}
            />
          ))}
        </div>
        <button
          className="clear-color-button"
          onClick={this.props.clearDetailView}
        >
          Clear
        </button>
      </div>
    );
  }
}

export default DetailView;

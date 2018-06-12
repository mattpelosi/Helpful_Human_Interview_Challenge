import React from "react";
import * as colorService from "../services/color.service.js";
class ContentWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {``
    colorService
      .read()
      .then(colors => {
        debugger;
        this.setState({ colors: colors });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="color-list">
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
            <div className="item">
              <div className="color-swatch" />
              <p className="color-label">#cfffff1</p>
            </div>
          </div>
          <div className="paginator" />
        </div>
      </React.Fragment>
    );
  }
}

export default ContentWrapper;

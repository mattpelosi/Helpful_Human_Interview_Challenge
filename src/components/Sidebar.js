import React from "react";

class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="sidebar">
          <button className="random-color-button">Random Color</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Sidebar;

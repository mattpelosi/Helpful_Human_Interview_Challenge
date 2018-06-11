import React from "react";
import logo from "../assets/logo-symbol.svg";

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <div className="logo-container">
            <img className="logo" src={logo} alt="logo" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;

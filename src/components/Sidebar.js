import React from "react";
import { connect } from "react-redux";
import { selectRandomColor } from "../store/color.actions";
import '../css/sidebar.css'

class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    this.selectRandomColor = this.selectRandomColor.bind(this);
  }

  selectRandomColor() {
    const colorArr = this.props.colorIndex;
    const randomColor = colorArr[Math.floor(Math.random() * colorArr.length)];
    this.props.selectRandomColor(randomColor);
  }

  render() {
    return (
      <React.Fragment>
        <div className="sidebar">
          <button
            className="random-color-button"
            onClick={this.selectRandomColor}
          >
            Random Color
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  colorIndex: state.colorIndex
});

const mapDispatchToProps = dispatch => ({
  selectRandomColor: color => {
    dispatch(selectRandomColor(color));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

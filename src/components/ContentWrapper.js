import React from "react";
import * as colorService from "../services/color.service.js";
import ColorSwatch from "./ColorSwatch";
import Paginator from "./Paginator";
class ContentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allColorsArr: [],
      allColorsObj: {},
      currentColors: [],
      currentPage: null,
      totalPages: null
    };

    this.generateRandomColors = this.generateRandomColors.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    colorService.read().then(colors => {
      this.setState({ allColorsObj: colors }, () =>
        this.generateRandomColors()
      );
    });
  }

  generateRandomColors() {
    const randomColors = [];
    const colors = JSON.parse(JSON.stringify(this.state.allColorsObj));
    delete colors._id;

    const hexCodeArr = [];
    for (let color in colors) {
      for (let i = 0; i < colors[color].length; i++) {
        hexCodeArr.push(colors[color][i].hexCode);
      }
    }

    this.setState({ allColorsArr: hexCodeArr });
    // for (let i = 0; i < 12; i++) {
    //   const randomColor =
    //     colorNames[Math.floor(Math.random() * colorNames.length)];
    //   const randomIndex =
    //     colors[randomColor][
    //       Math.floor(Math.random() * colors[randomColor].length)
    //     ];
  }

  // shuffleColorsArray(arr){

  // }

  onPageChange(data) {
    const offset = (data.currentPage - 1) * data.pageLimit;
    const currentColors = this.state.allColorsArr.slice(
      offset,
      offset + data.pageLimit
    );

    this.setState({
      currentPage: data.currentPage,
      currentColors: currentColors,
      totalPages: data.totalPages
    });
  }

  render() {
    if (this.state.allColorsArr.length === 0) return null;

    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="color-list">
            {this.state.currentColors.map(color => (
              <ColorSwatch text={color} background={color} />
            ))}
          </div>

          <Paginator
            totalColors={this.state.allColorsArr.length}
            pageLimit={12}
            pageNeighbors={1}
            onPageChange={this.onPageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ContentWrapper;

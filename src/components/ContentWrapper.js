import React from "react";
import * as colorService from "../services/color.service.js";
import ColorSwatch from "./ColorSwatch";
import Paginator from "./Paginator";
class ContentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allColors: [],
      currentColors: [],
      currentPage: null,
      totalPages: null
    };

    this.generateRandomColors = this.generateRandomColors.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  async componentDidMount() {
    const colors = await colorService.read();
    await this.setState({ allColors: colors });
    this.generateRandomColors();
  }

  generateRandomColors() {
    const randomColors = [];
    const colors = JSON.parse(JSON.stringify(this.state.allColors));
    delete colors._id

    const hexCodeArr = [];
    for (let color in colors) {
      for (let i = 0; i < colors[color].length; i++) {
        hexCodeArr.push(colors[color][i].hexCode);
      }
    }

    // for (let i = 0; i < 12; i++) {
    //   const randomColor =
    //     colorNames[Math.floor(Math.random() * colorNames.length)];
    //   const randomIndex =
    //     colors[randomColor][
    //       Math.floor(Math.random() * colors[randomColor].length)
    //     ];


    this.setState({ currentColors: hexCodeArr });
  }

  // shuffleColorsArray(arr){

  // }

  onPageChange(data) {
    // const offset = (data.currentPage - 1) * data.pageLimit;
    // debugger;
    // const currentColors = this.state.allColors.slice(
    //   offset,
    //   offset + data.pageLimit
    // );
    // this.setState({
    //   currentPage: data.currentPage,
    //   currentColors: data.currentColors,
    //   totalPages: data.totalPages
    // });
  }

  render() {
    //prevent react from attempting to render undefined variables in state
    if (
      this.state.allColors === undefined ||
      this.state.currentColors === undefined
    )
      return null;

    const swatches = this.state.currentColors.map(color => (
      <ColorSwatch text={color} background={color} />
    ));

    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="color-list">{swatches}</div>
          <Paginator
            totalColors={this.state.allColors}
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

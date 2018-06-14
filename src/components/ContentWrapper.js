import React from "react";
import * as colorService from "../services/color.service.js";
import ColorSwatch from "./ColorSwatch";
import Paginator from "./Paginator";
import DetailView from "./DetailView";
class ContentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allColorsArr: [],
      allColorsObj: {},
      currentColors: [],
      currentPage: null,
      totalPages: null,
      detailView: false,
      detailColor: "",
      detailList: []
    };

    this.generateRandomColors = this.generateRandomColors.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.shuffleColorsArray = this.shuffleColorsArray.bind(this);
    this.selectDetailView = this.selectDetailView.bind(this);
    this.clearDetailView = this.clearDetailView.bind(this);
    this.returnColorGroup = this.returnColorGroup.bind(this);
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

    let hexCodeArr = [];
    for (let color in colors) {
      for (let i = 0; i < colors[color].length; i++) {
        hexCodeArr.push(colors[color][i].hexCode);
      }
    }

    hexCodeArr = this.shuffleColorsArray(hexCodeArr);
    this.setState({ allColorsArr: hexCodeArr });
    // for (let i = 0; i < 12; i++) {
    //   const randomColor =
    //     colorNames[Math.floor(Math.random() * colorNames.length)];
    //   const randomIndex =
    //     colors[randomColor][
    //       Math.floor(Math.random() * colors[randomColor].length)
    //     ];
  }

  shuffleColorsArray(arr) {
    //Fisher-Yates shuffle
    let m = arr.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
    }

    return arr;
  }

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

  returnColorGroup(color) {
    const obj = this.state.allColorsObj;
    let group = {};
    for (let prop in obj) {
      for (let i = 0; i < obj[prop].length; i++) {
        if (obj[prop][i].hexCode === color) {
          group = obj[prop];
          break;
        }
      }
    }
    return group;
  }

  selectDetailView(color) {
    const detailList = this.returnColorGroup(color);
    
    this.setState({
      detailView: true,
      detailColor: color,
      detailList: detailList
    });
  }

  clearDetailView() {
    this.setState({
      detailView: false,
      detailColor: ""
    });
  }

  render() {
    if (this.state.allColorsArr.length === 0) return null;

    return (
      <React.Fragment>
        <div className="content-wrapper">
          {!this.state.detailView ? (
            <React.Fragment>
              <div className="color-list">
                {this.state.currentColors.map((color, index) => (
                  <ColorSwatch
                    key={index}
                    text={color}
                    background={color}
                    detailView={this.selectDetailView}
                  />
                ))}
              </div>
              <Paginator
                totalColors={this.state.allColorsArr.length}
                pageLimit={12}
                pageNeighbors={1}
                onPageChange={this.onPageChange}
              />
            </React.Fragment>
          ) : (
            <DetailView
              detailColor={this.state.detailColor}
              clearDetailView={this.clearDetailView}
              detailList={this.state.detailList}
              detailView={this.selectDetailView}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ContentWrapper;

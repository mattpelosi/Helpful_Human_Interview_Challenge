import React from "react";
import * as colorService from "../services/color.service.js";
import ColorSwatch from "./ColorSwatch";
import Paginator from "./Paginator";
import DetailView from "./DetailView";
import { connect } from "react-redux";
import { addColorIndex } from "../store/color.actions";
import "../css/content.wrapper.css"
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
    this.ArrayFromObj = this.ArrayFromObj.bind(this);
  }

  async componentDidMount() {
    const colors = await colorService.colorScraper();
    await this.setState({ allColorsObj: colors }, () =>
      this.generateRandomColors()
    );
  }

  componentDidUpdate(prevState) {
    if (this.props.randomColor !== prevState.randomColor) {
      this.selectDetailView(this.props.randomColor.hexCode);
    }
  }

  generateRandomColors() {
    const colors = JSON.parse(JSON.stringify(this.state.allColorsObj));
    delete colors._id;
    let hexCodeArr = this.ArrayFromObj(colors);
    hexCodeArr = this.shuffleColorsArray(hexCodeArr);
    this.setState({ allColorsArr: hexCodeArr });
    this.props.addColorIndex(hexCodeArr);
  }

  ArrayFromObj(obj) {
    let arr = [];
    for (let color in obj) {
      for (let i = 0; i < obj[color].length; i++) {
        arr.push(obj[color][i]);
      }
    }
    return arr;
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
                    colorData={color}
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

const mapStateToProps = state => ({
  randomColor: state.randomColor
});

const mapDispatchToProps = dispatch => ({
  addColorIndex: colorIndex => {
    dispatch(addColorIndex(colorIndex));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentWrapper);

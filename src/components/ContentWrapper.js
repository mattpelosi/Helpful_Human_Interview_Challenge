import React from "react";
import * as colorService from "../services/color.service.js";
import ColorSwatch from "./ColorSwatch";
class ContentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: {
        blue: [{ hexCode: "#ccff99" }]
      },
      randomColors: []
    };

    this.generateRandomColors = this.generateRandomColors.bind(this);
  }

  async componentDidMount() {
    const colors = await colorService.read();
    await this.setState({ colors: colors });
    this.generateRandomColors();
  }

  generateRandomColors() {
    const randomColors = [];
    const colors = this.state.colors;
    const colorNames = Object.keys(colors);
    const _id = colorNames.indexOf("_id");
    colorNames.splice(_id, 1);
    for (let i = 0; i < 12; i++) {
      const randomColor =
        colorNames[Math.floor(Math.random() * colorNames.length)];
      const randomIndex =
        colors[randomColor][
          Math.floor(Math.random() * colors[randomColor].length)
        ];
      // debugger;
      randomColors.push(randomIndex.hexCode.trim());
    }
    this.setState({ randomColors: randomColors });
  }

  render() {
    const swatches = this.state.randomColors.map(color => (
      <ColorSwatch text={color} background={color} />
    ));

    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="color-list">{swatches}</div>
          <div className="paginator" />
        </div>
      </React.Fragment>
    );
  }
}

export default ContentWrapper;

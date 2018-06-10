const request = require("request");
const cheerio = require("cheerio");
const Nightmare = require("nightmare");
// const nightmare = Nightmare({ show: true });
const nightmare = Nightmare();

module.exports = {
  colorScraper: colorScraper
};

const colorNames = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Brown",
  "Gray"
];

function colorScraper() {
  return new Promise((resolve, reject) => {
    let url = "https://www.w3schools.com/colors/colors_picker.asp";
    nightmare
      .goto(url)
      .evaluate(function(colorNames) {
        //--------------- Function 1 ----------------------
        return colorNames.reduce(function(colorGroup, color) {
          document.getElementById("entercolorDIV").children[0].value = color;
          document.getElementById("entercolorDIV").children[1].click();
          const colorTable = document.querySelector("#lumtopcontainer tbody")
            .children;
          colorArr = Array.from(colorTable);
          //-------------- Function 2 ----------------
          const colorObj = colorArr.reduce(function(list, shade) {
            if (shade.firstChild.innerText !== "") {
              list.push({
                lightness: shade.firstChild.innerText,
                hexCode: shade.lastChild.innerText
              });
            }
            return list;
          }, []);
          //---------------------------------------------------
          colorGroup[color] = colorObj;
          return colorGroup;
        }, {});
      }, colorNames)//how can I bring additinal functions into evaluate()'s scope?
      .then(result => {
        return resolve(result);
      });
  });
}

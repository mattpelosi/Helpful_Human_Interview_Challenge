const colorService = require("./color.service");

module.exports = {
  colorScraper: colorScraper
};

function colorScraper(req, res) {
  colorService
    .colorScraper()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
}

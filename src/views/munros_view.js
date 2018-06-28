const PubSub = require('../helpers/pub_sub.js');

const MunrosView = function (selectElement, dropElement) {
  this.element = selectElement;
  this.dropElement = dropElement;
};

MunrosView.prototype.bindEvents = function () {
  PubSub.subscribe('Munros:munros-data-ready', (evt) => {
    // this.populate(evt.detail)
  });
  PubSub.subscribe('Munros:munros-regions-ready', (evt) => {
    this.populateListOfRegions(evt.detail)
  });
};


// MunrosView.prototype.populate = function (munros) {
//   munros.forEach((munro) => {
//     const munrosName = document.createElement('h2');
//     munrosName.textContent = munro.name;
//     this.element.appendChild(munrosName);
//     const munrosList = document.createElement("ul");
//     const munroHeight = document.createElement("li");
//     const munroMeaning = document.createElement("li");
//     munroHeight.textContent = "Height: " + munro.height;
//     munroMeaning.textContent = "Meaning: " + munro.meaning;
//     munrosList.appendChild(munroMeaning);
//     munrosList.appendChild(munroHeight);
//     this.element.appendChild(munrosList);
//   });
// };

MunrosView.prototype.populateListOfRegions = function (regions) {
  regions.forEach((region) => {
    const munrosRegion = document.createElement('option');
    munrosRegion.textContent = region;
    munrosRegion.value = region;
    this.dropElement.appendChild(munrosRegion);
  });
};





module.exports = MunrosView;

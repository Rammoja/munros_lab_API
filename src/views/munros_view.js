const PubSub = require('../helpers/pub_sub.js');

const MunrosView = function (selectElement) {
  this.element = selectElement;
};

MunrosView.prototype.bindEvents = function () {
  PubSub.subscribe('Munros:munros-data-ready', (evt) => {
    this.populate(evt.detail)
  });
};


MunrosView.prototype.populate = function (munros) {
  munros.forEach((munro) => {
    const munrosName = document.createElement('h2');
    munrosName.textContent = munro.name;
    this.element.appendChild(munrosName);
    const munrosList = document.createElement("ul");
    const munroHeight = document.createElement("li");
    const munroMeaning = document.createElement("li");
    munroHeight.textContent = "Height: " + munro.height;
    munroMeaning.textContent = "Meaning: " + munro.meaning;
    munrosList.appendChild(munroMeaning);
    munrosList.appendChild(munroHeight);
    this.element.appendChild(munrosList);
  });
};




module.exports = MunrosView;

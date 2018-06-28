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
  const munrosList = document.createElement("ol");
  munros.forEach((munro, index) => {
    const aMunro = document.createElement("li");
    aMunro.textContent = munro.name;
    munrosList.appendChild(aMunro);
  });
  this.element.appendChild(munrosList);
};

module.exports = MunrosView;

const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Munros = function (url) {
  this.url = url;
  this.munros = [];
};

// Munros.prototype.getData = function () {
//   const request = new RequestHelper(this.url);
//   request.get(data => this.handleData(data));
// };

Munros.prototype.getData = function () {
  const request = new RequestHelper(this.url);
  const handleRequestComplete = (responseData) => {
    this.munros = responseData;
    const uniqueRegions = this.getUniqueRegions();
    PubSub.publish('Munros:munros-data-ready', this.munros);
    PubSub.publish('Munros:munros-regions-ready', uniqueRegions);
  };
  request.get()
    .then(handleRequestComplete)
    .catch(error => console.error(error));
}

Munros.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (evt) => {
    const munroes = this.getMunroByRegion(evt.detail);
    PubSub.publish('Munros:munros-region-selected-ready', munroes);
  });
};

// Munros.prototype.handleData = function (data) {
//   this.munros = data;
//   PubSub.publish('Munros:munros-data-ready', this.munros);
// };
//

Munros.prototype.getUniqueRegions = function () {
  const allRegions = this.munros.map((munro) =>{
    return munro.region;
  })
  const uniqueArray = allRegions.filter((value, index, self) => {
    return self.indexOf(value) === index;
  })
  return uniqueArray;
};

Munros.prototype.getMunroByRegion = function (region) {
  const arrayOfMunros = [];
  const uniqueArray = this.munros.forEach((munro) => {
      if (munro.region == region){
        arrayOfMunros.push(munro)
      }
  })
  return arrayOfMunros;
};





module.exports = Munros;

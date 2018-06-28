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
    PubSub.publish('Munros:munros-data-ready', this.munros);
  };
  request.get()
    .then(handleRequestComplete)
    .catch(error => console.error(error));
}

// Munros.prototype.handleData = function (data) {
//   this.munros = data;
//   PubSub.publish('Munros:munros-data-ready', this.munros);
// };
//


module.exports = Munros;

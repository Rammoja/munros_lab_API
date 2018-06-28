const Munros = require('./models/munros.js')
document.addEventListener('DOMContentLoaded', () => {
  const munros = new Munros('https://munroapi.herokuapp.com/api/munros')
  munros.getData();
})

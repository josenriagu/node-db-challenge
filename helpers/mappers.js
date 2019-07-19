module.exports = {
   refiner: function (toBeMapped) {
      return toBeMapped.map(item => item.completed === 1 ? item.completed = true : item.completed = false)
   }
};
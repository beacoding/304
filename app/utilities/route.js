module.exports = {
  convertToRoute: function (clubName) {
    return '/clubs/' + clubName.split(" ").join("").toLowerCase();
  }
}
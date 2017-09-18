var glob = require('glob');
var _ = require('underscore');
var fs = require('fs');

module.exports = {
  maps: [],

  loadMaps: function() {
    var maps = glob.sync("maps/*.json");
    var self = this;

    _.forEach(maps, function(map) {
      self.maps.push(JSON.parse(fs.readFileSync(map, 'utf8')));
    })
  },

  getMaps: function() {
    return this.maps;
  },

  init: function() {
    this.loadMaps();

    console.log(this.getMaps().length + ' minigame(s) carregado(s).');
  }
}
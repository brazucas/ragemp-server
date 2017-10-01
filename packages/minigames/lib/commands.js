module.exports = function() {
  mp.events.addCommand("irparaveiculo", function (player, fullText, vehId) {
    var veh = mp.vehicles[vehId];

    if(veh && veh.position) {
      player.position = veh.position;
    } else {
      console.log('Veículo com ID '+vehId+' não encontrado.');
    }
  });
}();
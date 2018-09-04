mp.events.add('playerEnteredVehicle', (player) => {
    player.call('VehicleEnter', player.seat)
})

mp.events.add('playerExitVehicle', (player) => {
    player.call('VehicleExit', player.seat)
});
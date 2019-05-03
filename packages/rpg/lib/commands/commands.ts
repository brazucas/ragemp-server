export class Comandos {
  public static dararma(player: PlayerMp, weaponHash: string) {
    console.debug(`[COMANDOS - dararma] Dando arma ${weaponHash} para o jogador ${player.name}`);

    const asset = mp.joaat(weaponHash);

    console.log('>>>> asset ', asset);

    player.giveWeapon(asset, 1000);

    player.notify(`Arma ${weaponHash} recebida!`);
  }
}

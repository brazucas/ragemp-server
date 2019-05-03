export class Comandos {
  public static darArma(player: PlayerMp, weaponHash: string) {
    console.debug(`[COMANDOS - darArma] Dando arma ${weaponHash} para o jogador ${player.name}`);

    const asset = mp.joaat(weaponHash);

    console.log('>>>> asset ', asset);

    player.giveWeapon(asset, 1000);

    player.notify(`Arma ${weaponHash} recebida!`);
  }
}

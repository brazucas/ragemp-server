export class Comandos {
  public static darArma(player: PlayerMp, weaponHash: string) {
    console.debug(`[COMANDOS - darArma] Dando arma ${weaponHash} para o jogador ${player.name}`);

    player.giveWeapon(mp.joaat(weaponHash), 1000);
  }
}

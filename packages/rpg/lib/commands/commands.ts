export class Comandos {
  public static dararma(player: PlayerMp, weaponHash: string) {
    console.debug(`[COMANDOS - dararma] Dando arma ${weaponHash} para o jogador ${player.name}`);

    const asset = mp.joaat(weaponHash);

    console.log('>>>> asset ', asset);

    player.giveWeapon(asset, 1000);

    player.notify(`Arma ${weaponHash} recebida!`);
  }

  public static posicaoatual(player: PlayerMp) {
    console.debug(`[COMANDOS - posicaoatual] Posição atual de ${player.name}: ${player.position.toString()}`);

    player.outputChatBox(`Posição atual: ${player.position.toString()}`);
  }
}

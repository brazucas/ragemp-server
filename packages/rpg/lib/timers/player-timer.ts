import { BrazucasServer } from '../../../../common/brazucas-server';
import { Rpg } from '../../rpg';

const FOME_DEFAULT_DECREASE = 1;
const SEDE_DEFAULT_DECREASE = 1;
const SONO_DEFAULT_DECREASE = 1;
const FORCA_FISICA_DEFAULT_DECREASE = 1;

export class PlayerTimer {
  protected brazucasServer: BrazucasServer;

  constructor(brazucasServer: BrazucasServer) {
    this.brazucasServer = brazucasServer;

    setInterval(() => this.atualizarFome(), 60000);
    setInterval(() => this.atualizarSede(), 45000);
    setInterval(() => this.atualizarSono(), 180000);
    setInterval(() => this.atualizarForcaFisica(), 200000);
  }

  private atualizarFome() {
    mp.players.forEach(playerMp => {
      const brzPlayer = Rpg.playerProvider.findFromMp(playerMp);

      const updatedValue = Math.max(brzPlayer.storage.fome - FOME_DEFAULT_DECREASE, 0);

      if (updatedValue === 0) {
        playerMp.health -= 1;
      }

      Rpg.playerProvider.update(playerMp, {
        fome: updatedValue,
      });
    });
  }

  private atualizarSede() {
    mp.players.forEach(playerMp => {
      const brzPlayer = Rpg.playerProvider.findFromMp(playerMp);

      const updatedValue = Math.max(brzPlayer.storage.sede - SEDE_DEFAULT_DECREASE, 0);

      if (updatedValue === 0) {
        brzPlayer.storage.fome -= 1;
      }

      Rpg.playerProvider.update(playerMp, {
        sede: updatedValue,
      });
    });
  }

  private atualizarSono() {
    mp.players.forEach(playerMp => {
      const brzPlayer = Rpg.playerProvider.findFromMp(playerMp);

      const updatedValue = Math.max(brzPlayer.storage.sono - SONO_DEFAULT_DECREASE, 0);

      if (updatedValue === 0) {
        // @TODO fazer o jogador dormir
      }

      Rpg.playerProvider.update(playerMp, {
        sono: updatedValue,
      });
    });
  }

  private atualizarForcaFisica() {
    mp.players.forEach(playerMp => {
      const brzPlayer = Rpg.playerProvider.findFromMp(playerMp);

      const updatedValue = Math.max(brzPlayer.storage.forcaFisica - FORCA_FISICA_DEFAULT_DECREASE, 0);

      if (updatedValue === 0) {
        // @TODO O que fazer quando chegar a zero?
      }

      Rpg.playerProvider.update(playerMp, {
        forcaFisica: updatedValue,
      });
    });
  }
}

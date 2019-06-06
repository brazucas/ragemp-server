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

      Rpg.playerProvider.update(playerMp, {
        fome: brzPlayer.storage.fome - FOME_DEFAULT_DECREASE,
      });
    });
  }

  private atualizarSede() {
    mp.players.forEach(playerMp => {
      const brzPlayer = Rpg.playerProvider.findFromMp(playerMp);

      Rpg.playerProvider.update(playerMp, {
        sede: brzPlayer.storage.sede - SEDE_DEFAULT_DECREASE,
      });
    });
  }

  private atualizarSono() {
    mp.players.forEach(playerMp => {
      const brzPlayer = Rpg.playerProvider.findFromMp(playerMp);

      Rpg.playerProvider.update(playerMp, {
        sono: brzPlayer.storage.sono - SONO_DEFAULT_DECREASE,
      });
    });
  }

  private atualizarForcaFisica() {
    mp.players.forEach(playerMp => {
      const brzPlayer = Rpg.playerProvider.findFromMp(playerMp);

      Rpg.playerProvider.update(playerMp, {
        forcaFisica: brzPlayer.storage.forcaFisica - FORCA_FISICA_DEFAULT_DECREASE,
      });
    });
  }
}

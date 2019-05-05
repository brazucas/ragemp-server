import { BrazucasServer } from '../../../../common/brazucas-server';
import { eventoLogin } from './login';

export function carregarEventos(brazucasServer: BrazucasServer) {
  eventoLogin(brazucasServer);
}

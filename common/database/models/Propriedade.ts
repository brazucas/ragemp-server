import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { TipoPropriedade } from './TipoPropriedade';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class Propriedade extends Model<Propriedade> {

  @Column
  nomeOriginal: string;

  @Column
  nomeExibido: string;

  @Column
  portaEntradaX: number;

  @Column
  portaEntradaY: number;

  @Column
  portaEntradaZ: number;

  @Column
  portaSaidaX: number;

  @Column
  portaSaidaY: number;

  @Column
  portaSaidaZ: number;

  @Column
  iconePickup: string;

  @ForeignKey(() => TipoPropriedade)
  tipo: TipoPropriedade;
}

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

  @ForeignKey(() => TipoPropriedade)
  tipo: TipoPropriedade;
}

import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { TipoPropriedade } from './TipoPropriedade';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class Propriedade extends Model<Propriedade> {

  @Column({allowNull: false, unique: true})
  nomeOriginal: string;

  @Column({allowNull: false, unique: true})
  nomeExibido: string;

  @Column({allowNull: false})
  portaEntradaX: number;

  @Column({allowNull: false})
  portaEntradaY: number;

  @Column({allowNull: false})
  portaEntradaZ: number;

  @Column({allowNull: false})
  portaSaidaX: number;

  @Column({allowNull: false})
  portaSaidaY: number;

  @Column({allowNull: false})
  portaSaidaZ: number;

  @Column({allowNull: false})
  iconePickup: string;

  @BelongsTo(() => TipoPropriedade, {foreignKey: {allowNull: false, name: 'tipo'}})
  tipoPropriedade: TipoPropriedade;
}

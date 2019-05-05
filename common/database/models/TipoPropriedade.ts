import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Propriedade } from './Propriedade';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class TipoPropriedade extends Model<TipoPropriedade> {

  @PrimaryKey
  @Column
  id: number;

  @Column({allowNull: false})
  nome: string;

  @Column({allowNull: false, unique: true})
  identificador: string;

  @HasMany(() => Propriedade, 'tipo')
  propriedades: Propriedade[];
}

import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Propriedade } from './Propriedade';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['identificador'],
    }
  ]
})
export class TipoPropriedade extends Model<TipoPropriedade> {

  @PrimaryKey
  @Column
  id: number;

  @Column({allowNull: false})
  nome: string;

  @Column({allowNull: false})
  identificador: string;

  @HasMany(() => Propriedade, 'tipo')
  propriedades: Propriedade[];
}

import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Jogador } from './Jogador';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['placaOriginal', 'placaExibido'],
    }
  ]
})
export class Veiculo extends Model<Veiculo> {

  @Column({allowNull: false})
  placaOriginal: string;

  @Column({allowNull: false})
  placaExibido: string;

  @Column({allowNull: false})
  modelo: string;

  @Column({allowNull: false, type: DataType.STRING})
  posicaoX: string;

  @Column({allowNull: false, type: DataType.STRING})
  posicaoY: string;

  @Column({allowNull: false, type: DataType.STRING})
  posicaoZ: string;

  @Column({allowNull: false, type: DataType.STRING})
  posicaoOriginalX: string;

  @Column({allowNull: false, type: DataType.STRING})
  posicaoOriginalY: string;

  @Column({allowNull: false, type: DataType.STRING})
  posicaoOriginalZ: string;

  @Column({allowNull: false})
  rotacao: number;

  @Column({allowNull: false})
  transparencia: number;

  @Column({allowNull: false})
  corPrimariaR: number;

  @Column({allowNull: false})
  corPrimariaG: number;

  @Column({allowNull: false})
  corPrimariaB: number;

  @Column({allowNull: false})
  corSecundariaR: number;

  @Column({allowNull: false})
  corSecundariaG: number;

  @Column({allowNull: false})
  corSecundariaB: number;

  @Column({allowNull: false, defaultValue: true})
  trancado: boolean;

  @Column({allowNull: false, defaultValue: false})
  motor: boolean;

  @Column({allowNull: false, defaultValue: 1})
  mundo: number;

  @Column({allowNull: false})
  valorOriginal: number;

  @Column({allowNull: false})
  valorVenda: number;

  @Column({allowNull: false, defaultValue: true})
  aVenda: boolean;

  @BelongsTo(() => Jogador, {foreignKey: {allowNull: true, name: 'jogador'}})
  jogadorVeiculo: Jogador;
}

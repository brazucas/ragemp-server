import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { TipoPropriedade } from './TipoPropriedade';
import { Jogador } from './Jogador';

@Table({
  timestamps: true,
  createdAt: 'dataCriado',
  deletedAt: 'dataExcluido',
  updatedAt: 'dataAtualizado',
  paranoid: true,
})
export class Propriedade extends Model<Propriedade> {

  @Column({allowNull: false, unique: true})
  placaOriginal: string;

  @Column({allowNull: false, unique: true})
  placaExibido: string;

  @Column({allowNull: false})
  modelo: string;

  @Column({allowNull: false})
  posicaoX: number;

  @Column({allowNull: false})
  posicaoY: number;

  @Column({allowNull: false})
  posicaoZ: number;

  @Column({allowNull: false})
  rotacao: number;

  @Column({allowNull: false})
  transparencia: number;

  @Column({allowNull: false})
  corPrimariaR: string;

  @Column({allowNull: false})
  corPrimariaG: string;

  @Column({allowNull: false})
  corPrimariaB: string;

  @Column({allowNull: false})
  corSecundariaR: string;

  @Column({allowNull: false})
  corSecundariaG: string;

  @Column({allowNull: false})
  corSecundariaB: string;

  @Column({allowNull: false, defaultValue: true})
  trancado: boolean;

  @Column({allowNull: false, defaultValue: false})
  motor: boolean;

  @Column({allowNull: false, defaultValue: 1})
  mundo: number;

  @Column({allowNull: false})
  valorOriginal: string;

  @Column({allowNull: false})
  valorVenda: string;

  @Column({allowNull: false, defaultValue: true})
  aVenda: boolean;

  @BelongsTo(() => Jogador, {foreignKey: {allowNull: false, name: 'jogador'}})
  jogadorVeiculo: Jogador;
}

import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Furniture extends Model<Furniture> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  modelPath: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  snapshotPath: string;

  @Column({ type: DataType.FLOAT })
  defaultScale: number;
}

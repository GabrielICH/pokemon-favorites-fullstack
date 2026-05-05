import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('favorites')
@Unique(['pokemonId'])
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pokemonId: number;

  @Column({ length: 120 })
  name: string;

  @Column()
  imageUrl: string;

  @Column('simple-array')
  types: string[];

  @Column({ length: 300, nullable: true })
  note?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

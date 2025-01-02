import { Genre } from '../genres/entities/genres.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('game')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'img_path', length: 255 })
  img: string;

  @Column('int')
  price: number;

  @ManyToMany(() => Genre, (genre) => genre.games)
  @JoinTable({
    name: 'game_genre',
    joinColumn: {
      name: 'game_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  genres: Genre[];
}

import { Genre } from 'src/genres/genres.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  img: string;

  @Column()
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

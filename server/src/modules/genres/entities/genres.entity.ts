import { Game } from '../../games/entities/games.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  genresImg: string;

  @ManyToMany(() => Game, (game) => game.genres)
  games: Game[];
}

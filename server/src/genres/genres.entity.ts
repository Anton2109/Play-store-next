import { Game } from 'src/games/games.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  genresImg: string;

  @ManyToMany(() => Game, (game) => game.genres)
  games: Game[];
}

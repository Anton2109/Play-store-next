import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './games.entity';
import { CreateGameDto } from './dto/games.dto';
import { pathsConfig } from '../../config/paths.config';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async findAll(): Promise<Game[]> {
    const games = await this.gameRepository.find();
    return games.map((game) => ({
      ...game,
      img: `${pathsConfig.baseUrl}${pathsConfig.assets.images.games}/${game.img}`,
    }));
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['genres'],
    });

    if (!game) {
      throw new NotFoundException(`Игра с ID ${id} не найдена`);
    }

    return {
      ...game,
      img: `${pathsConfig.baseUrl}${pathsConfig.assets.images.games}/${game.img}`,
    };
  }

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(game);
  }

  async remove(id: number): Promise<void> {
    const game = await this.findOne(id);
    await this.gameRepository.remove(game);
  }
}
